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