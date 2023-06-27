const net = require("net");

const server = net.createServer((socket) => {
  console.log("TCP connection established");

  socket.on("data", (data) => {
    console.log(`Received data over TCP: ${data}`);
  });

  socket.on("end", () => {
    console.log("TCP connection ended");
  });
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`TCP server listening on port ${port}`);
});
