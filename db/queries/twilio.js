const db = require('../connection');
const { Pool } = require('pg');
const twilio = require('twilio');
require('dotenv').config();
// must use npm install twilio@3.52.0

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid, authToken);

const sendOrderReceivedSMS = (phoneNumber) => {
    client.messages
        .create({
            body: "Thank you for ordering! Your order has been received and is being processed.",
            from: '+14256107880',
            to: phoneNumber // use client's ph # here from DB
        })
        .then(message => console.log('Order received SMS sent:', message.sid))
        .catch(error => console.error('Error sending order received SMS:', error));
};

const sendOrderCompletedSMS = (phoneNumber) => {
    client.messages
        .create({
            body: "Your order is ready for pickup.",
            from: '+14256107880',
            to: phoneNumber // use client's ph # here from DB
        })
        .then(message => console.log('Order completed SMS sent:', message.sid))
        .catch(error => console.error('Error sending order completed SMS:', error));
};

const phoneNumber = '+17807295721';
sendOrderReceivedSMS(phoneNumber);

module.exports = db;
