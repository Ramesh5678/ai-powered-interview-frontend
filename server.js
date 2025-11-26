const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const candidateRoutes = require('./routes/candidateRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});