import 'dotenv/config';
import connectDB from './configs/db';
import { app } from './app';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
});
