const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Allow only your Live Server origin
app.use(bodyParser.json());

// VAPID keys generated using `web-push generate-vapid-keys`
const publicVapidKey = 'BB8-OAi7-s0mIuCTdRROifjlbZGtJ7q4_ix2D44OwJ2do7wISVWlhoNsPKVJIx4lPbcgpVBjf9fNzYBVzGWyy6Q';
const privateVapidKey = 'UDcde1BgnWvelTh-bOZuZXGyOeeqQ22K8Sa8z4vOiRw';

// Configure VAPID keys
webPush.setVapidDetails(
    'mailto:themhz@gmail.com',
    publicVapidKey,
    privateVapidKey
);

let subscriptions = []; // In-memory storage for subscriptions; use a database in production

// Endpoint to store subscription
app.post('/subscribe', (req, res) => {
    console.log('Received subscription:', req.body);
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({ message: 'Subscription stored successfully' });
});

app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

// Endpoint to trigger push notification (for testing)
app.post('/send-notification', (req, res) => {
    const notificationPayload = JSON.stringify({
        title: 'Push Notification',
        body: 'This is a test push notification!',
    });

    // Send a push notification to each subscribed client
    subscriptions.forEach(subscription => {
        webPush.sendNotification(subscription, notificationPayload).catch(error => {
            console.error('Error sending notification', error);
        });
    });

    res.status(200).json({
        title: 'Push Notification',
        body: 'Notification sent'
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});