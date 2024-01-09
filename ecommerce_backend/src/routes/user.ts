import express from 'express';
import { newUser } from '../controllers/user.js';

const app = express.Router();


//route - /api/v1/user/new
app.post('/new',newUser)

export default app;
