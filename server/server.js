require("dotenv").config();

const env = require("./src/config/env");
const connectDB = require("./src/config/db");
const app = require("./src/app");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`AuthFlow API running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
