import Express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect('mongodb://db:27017/paperlive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Mongo');
    startServer();
  })
  .catch((error) => {
    console.log('Unable to connect');
    console.log(error);
  });

function startServer() {
  // Api rules

  /**
   * Healthcheck
   */
  app.get('/ping', (req, res) => {
    return res.status(200).json('The server is running!');
  });

  /**
   * Handle Errors
   */
  app.use('/', (req, res) => {
    return res.status(404).json({ error: 'not found' });
  });

  http.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
