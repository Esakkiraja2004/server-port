const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a nodemailer transporter using your Gmail account
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'esakkiraja2401@gmail.com',
        pass: 'cmvm kyld dcuf szny',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'esakkiraja2401@gmail.com',
      to: 'bjpnanguneri@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log the result
    console.log('Email sent:', info.response);

    // Send the HTML file as a response
    const filePath = path.join(__dirname, 'result.html');
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
