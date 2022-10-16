import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import clubRoutes from './routes/clubs.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/clubs', clubRoutes)

const CONNECTION_URL =
	'mongodb+srv://boburkomilob:9bOUrZSnvxBr54JY@cluster0.v5eor.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on pror: ${PORT}`))
	)
	.catch((error) => console.log(error.message));
