const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server
  .listen(process.env.PORT || 4000, () => {
    console.log(
      `App is running at http://127.0.0.1:${process.env.PORT || 4000}`
    );
  })
  .on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error("Address in use, retrying...");
    }
  });
