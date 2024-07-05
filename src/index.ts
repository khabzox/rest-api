import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from './router';

dotenv.config({ path: '.env.local' });

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const SERVERPORT = process.env.PORT || 3000;

app.use('/', router());

const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello, this a Complete Rest APi with Node, Express, TypeScript & MongoDB + Authentication by khabzox');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(SERVERPORT, () => {
    console.log(`Server is running on http://localhost:${SERVERPORT}`);
  });
}

export default app;
