const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const pairingRoutes = require('./routes/pairingRoutes');

const app = express();
app.use(express.json());
app.use('/api', pairingRoutes);

app.get('/', (req, res) => res.send('Pairing API running.'));

const PORT = process.env.PORT || 4200;

mongoose.connect(process.env.MONGO_URI, { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
