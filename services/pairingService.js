const Pairing = require('../models/pairingModel');

async function pairMentorsToMentees(mentors, mentees) {
  const pairs = {};
  const unmatched = [];
  const mentorMap = {};

  // Group mentors by field
  for (const mentor of mentors) {
    if (!mentorMap[mentor.stack]) mentorMap[mentor.stack] = [];
    mentorMap[mentor.stack].push({ ...mentor, mentees: [] });
    pairs[mentor.name] = [];
  }

  // Assign mentees
  for (const mentee of mentees) {
    const fieldMentors = mentorMap[mentee.stack] || [];
    const mentor = fieldMentors.find(m => m.mentees.length < 2);

    if (mentor) {
      mentor.mentees.push(mentee.name);
      pairs[mentor.name].push(mentee.name);

      const exists = await Pairing.findOne({
        mentorName: mentor.name,
        menteeName: mentee.name
      });

      if (!exists) {
        await Pairing.create({
          mentorName: mentor.name,
          menteeName: mentee.name,
          field: mentee.stack
        });
      }
    } else {
      unmatched.push(mentee);
    }
  }

  return { pairs, unmatched };
}

module.exports = { pairMentorsToMentees };
