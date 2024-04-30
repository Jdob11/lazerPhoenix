const db = require('../connection');
const { Pool } = require('pg');
const twilio = require('twilio');

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


module.exports = db;
