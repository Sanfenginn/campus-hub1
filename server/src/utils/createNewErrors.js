const path = require("path");

const createNewErrors = (description, statusCode, type, data = null) => {
  const error = new Error(description);
  error.statusCode = statusCode;
  error.data = data;
  error.errorType = type;

  // 为了获取文件名，我们需要解析堆栈信息
  const stackLines = error.stack.split("\n");
  const callerLine = stackLines[2]; // 通常第二行是调用 createNewErrors 的位置
  const match = callerLine.match(/\(([^)]+)\)/); // 匹配括号内的内容

  if (match?.[1]) {
    const fullPath = match[1].split(":")[0];
    error.fileName = path.relative(process.cwd(), fullPath); // 相对路径
  } else {
    error.fileName = "Unknown";
  }

  return error;
};

module.exports = createNewErrors;
