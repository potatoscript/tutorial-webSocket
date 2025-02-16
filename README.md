## WebSocket Tutorial: Building a Real-Time Server

### Prerequisites:
1. **Node.js Installed**: Ensure you have Node.js installed on your system.
2. **Package Manager**: Yarn or npm for dependency management.

---

### Step 1: Install the WebSocket Library
To start, install the `ws` WebSocket library using Yarn or npm.

```bash
yarn add ws
# or if using npm
npm install ws
```

---

### Step 2: Update `package.json` for ES Module Support
Add `"type": "module"` to your `package.json` file to enable ES Module syntax (`import/export`).

```json
{
  "name": "websocket-server",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "dependencies": {
    "ws": "^8.0.0"
  }
}
```

---

### Step 3: Create the WebSocket Server

Create a new file `server.js` and set up a basic WebSocket server using the `ws` library.

```javascript
import { WebSocketServer } from 'ws';

// Step 1: Initialize the WebSocket server on a specific port
const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Step 2: Set up connection handling
wss.on('connection', (ws) => {
  console.log('New client connected.');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
  });

  // Send a welcome message to the newly connected client
  ws.send('Welcome to the WebSocket server!');
});
```

---

### Step 4: Broadcast Messages to All Clients
The WebSocket server uses `wss.clients` to manage all connected clients. To broadcast a message to all clients:
1. Convert `wss.clients` (a Set) to an array using `[...wss.clients]`.
2. Iterate over the array and send messages to each connected client.

The example in Step 3 already demonstrates this broadcasting logic.

---

### Step 5: Run the Server

Start the WebSocket server by running the following command in your terminal:

```bash
node server.js
```

You should see the message:  
`WebSocket server is running on ws://localhost:8080`

---

### Step 6: Testing Your WebSocket Server

#### Option 1: Use a WebSocket Client in JavaScript
You can test your server using a simple WebSocket client in the browser:

```javascript
const socket = new WebSocket('ws://localhost:8080');

// Listen for messages
socket.onmessage = (event) => {
  console.log(`Message from server: ${event.data}`);
};

// Send a message to the server
socket.onopen = () => {
  socket.send('Hello, server!');
};

// Handle errors
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle connection close
socket.onclose = () => {
  console.log('Connection closed.');
};
```

Open the browser console and run the code to interact with the server.

---

#### Option 2: Use `wscat` (WebSocket CLI Tool)

1. Install `wscat` globally:

   ```bash
   npm install -g wscat
   ```

2. Connect to your WebSocket server:

   ```bash
   wscat -c ws://localhost:8080
   ```

3. Send a message and observe the responses.

---

### Advanced Features:
1. **Error Handling**:
   Add error handling to gracefully manage unexpected issues.

   ```javascript
   ws.on('error', (error) => {
     console.error('WebSocket error:', error);
   });
   ```

2. **Ping-Pong for Connection Health**:
   Implement periodic ping-pong messages to check client connectivity and close inactive connections.

   ```javascript
   setInterval(() => {
     wss.clients.forEach((client) => {
       if (client.isAlive === false) return client.terminate();

       client.isAlive = false;
       client.ping();
     });
   }, 30000);

   wss.on('connection', (ws) => {
     ws.isAlive = true;
     ws.on('pong', () => (ws.isAlive = true));
   });
   ```

3. **Scalability**:
   For larger applications, consider integrating a message broker like Redis to manage WebSocket connections across multiple servers.

---

## tutorial-webSocket
1. install webSocket `yarn add ws`
2. go to `package.json` and add `"type":"module"` to let you do dynamic input
3. create `server.js` and import ws into it
4. next we create a connection for the one who send the message and send 
   the message to all the other
   wss.clients = JavaScript Sets (A JavaScript Set is a collection of unique values.
   Each value can only occur once in a Set.
   A Set can hold any value of any data type.
5. convert the `wss.cliens` into array as `[...wss.clients]`   

6. run your server by typing `node server.js` in the terminal
