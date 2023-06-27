// app-udp.js

const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Received data over UDP: ${msg}`);
});

const port = process.env.PORT;

server.bind(port, () => {
  console.log(`UDP server listening on port ${port}`);
});
