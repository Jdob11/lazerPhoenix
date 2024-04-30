const db = require('../connection');
const { Pool } = require('pg');
const twilio = require('twilio');

const accountSid = 'ACa93e8675be6ad28c57aae9767b911ae7';
const authToken = '052f0616c1d986c1e4b974aee4cb9b1d';
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
            to: phoneNumber
        })
        .then(message => console.log('Order completed SMS sent:', message.sid))
        .catch(error => console.error('Error sending order completed SMS:', error));
};


module.exports = db;
