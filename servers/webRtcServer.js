// server.js
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>WebRTC Test Server</h1>');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log("Received message:", message); // Log received message
    try {
      // Attempt to parse the message to ensure it's valid JSON
      JSON.parse(message);
    } catch (error) {
      console.error("Received non-JSON message, not broadcasting:", message);
      return; // Skip non-JSON messages
    }

    // Broadcast the valid JSON message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3000, () => console.log('Server is running on http://localhost:3000'));
