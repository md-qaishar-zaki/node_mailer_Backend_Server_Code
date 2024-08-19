const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
 
const corsOptions = {
  origin: 'http://localhost:5000/submit-form',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/submit-form', (req, res) => {
  const { firstName, lastName, phoneNo, address } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'qaisharzaki@gmail.com',
    subject: 'Form Submission',
    text: `You have received a new form submission:
    
    First Name: ${firstName}
    Last Name: ${lastName}
    Phone Number: ${phoneNo}
    Address: ${address}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Form submitted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

