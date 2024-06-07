import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 3000;

connectDB();
const app = express();
const allowedOrigins = ['http://localhost:5173']; // İzin verilen origin adresleri

app.get('/', (req, res) => {
  res.send('Server is ready to connect');
});
app.use(
  cors({
    origin: function (origin, callback) {
      // Origin, izin verilen origin adreslerinden biriyse veya undefined ise (yani bir istemci olmayabilir),
      // callback(null, true) çağrılmalıdır.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {});
