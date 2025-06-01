const { pairMentorsToMentees } = require('../services/pairingService');
const Pairing = require('../models/pairingModel');


exports.pairMentorMentee = async (req, res) => {
  const { mentors, mentees } = req.body;

  if (!Array.isArray(mentors) || !Array.isArray(mentees)) {
    return res.status(400).json({
      success: false,
      error: "Mentors and mentees must be arrays"
    });
  }

  try {
    const { pairs, unmatched } = await pairMentorsToMentees(mentors, mentees); 

    return res.status(200).json({
      success: true,
      message: unmatched.length > 0
        ? "Pairing completed with some unmatched mentees" 
        : "Pairing completed successfully",
      data: {
        pairs,
        unmatched
      }
    });
  } catch (err) {
    console.error("Pairing error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to generate pairings",
      details: err.message
    });
  }
};


exports.getPairings = async (req, res) => {
  try {
    const pairings = await Pairing.find();
    return res.status(200).json({
      success: true,
      message: "Retrieved all pairings",
      data: pairings
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve pairings", 
      details: err.message
    });
  }
};
