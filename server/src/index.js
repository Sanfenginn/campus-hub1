const config = require("./config");
const app = require("./app");
const createLogger = require("./utils/logger");
const logger = createLogger(__filename);
const connectToDB = require("./utils/db");

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(config.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start the server", err);
    process.exit(1); // 非零状态码表示程序异常退出
  }
};
startServer();
// connectToDB().then(() => {
//   app.listen(config.PORT, () => {
//     logger.info(`Server is running on http://localhost:${config.PORT}`);
//   });
// });

//确保在所有与数据库连通成功之后再启动服务器
