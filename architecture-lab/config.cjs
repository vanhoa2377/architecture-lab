const rawPort = process.env.PORT;
const path = require("node:path");

if (rawPort === undefined || rawPort.trim() === "") {
    throw new Error("Thiếu cấu hình PORT");
}

const port = Number(rawPort);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT phải là số nguyên từ 1 đến 65535");
}

const appEnv = process.env.APP_ENV;

if (!["development", "staging", "production"].includes(appEnv)) {
    throw new Error(
        "APP_ENV phải là development, staging hoặc production",
    );
}

const nodeEnv = process.env.NODE_ENV;

if (!["development", "test", "production"].includes(nodeEnv)) {
    throw new Error(
        "NODE_ENV phải là development, test hoặc production",
    );
}

if (appEnv !== "development" && nodeEnv !== "production") {
    throw new Error(
        "Staging và production cần NODE_ENV=production",
    );
}

const rawDbFile = process.env.DB_FILE;

if (rawDbFile === undefined || rawDbFile.trim() === "") {
    throw new Error("Thiếu cấu hình DB_FILE");
}

const dbFile = path.resolve(__dirname, rawDbFile.trim());

// module.exports = { port, appEnv, nodeEnv };

module.exports = {
    port,
    appEnv,
    nodeEnv,
    dbFile,
};