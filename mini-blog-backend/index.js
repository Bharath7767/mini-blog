const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization','Accept','X-Requested-With'],
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization','Accept','X-Requested-With'],
}))

app.use('/api', require('./src/routes/index'));
app.use('/uploads',express.static('src/uploads'))//error came but solved!!! opaque response blocked


const PORT = 7767;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
