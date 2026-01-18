import 'dotenv/config';
import express from 'express';
import connectDB from './configs/db';

const app = express();
const PORT = process.env.PORT || 3000;

// Minimal middleware
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.send('Server running ✅'));

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
});
