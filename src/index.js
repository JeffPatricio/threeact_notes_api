import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.SERVER_PORT || 8080, () => {
	console.log(`server running in port ${process.env.SERVER_PORT || 8080}`);
});