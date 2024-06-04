// server.js

require('dotenv').config(); // pentru a încărca variabilele de mediu din fișierul .env
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-message', (req, res) => {
    const { fullName, emailAddress, phoneNumber, message } = req.body;

    // Configurare nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Poți folosi orice alt serviciu de email
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailAddress,
        subject: 'Your Message to RideWave',
        text: `Full Name: ${fullName}\nEmail Address: ${emailAddress}\nPhone Number: ${phoneNumber}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
