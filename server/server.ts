import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userSchema, IUser } from './schemas/User.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model<IUser>('User', userSchema);

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'MERN App Backend API' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});