const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, simple, colorize } = format;

// 노출 형식 설정
const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        timestamp({
            format: "YYY-MM-DD HH:mm:dd",
        }),
        // json(),
        printFormat
    ),
    console: combine(
        // createLogger에서 파일로 저장할 때는 colorize를 사용하지 않아야 이상한 문자가 저장되지 않음.
        colorize(),
        simple()
    ),
};

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console,
    }),
}

const logger = createLogger({
    // 파일로 저장
    transports: [opts.file],
});

// 개발 중일때에만 콘솔 노출
if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message),
};

module.exports = logger;