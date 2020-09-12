const serverless = require("serverless-http")
const app = require("../../server")

// process.on("uncaughtException", err => {
//   console.error(`uncaughtException ${err.toString()}`);
// });

// process.on("unhandledRejection", reason => {
//   console.error(`unhandledRejection ${reason}`);
// });

module.exports.handler = serverless(app);