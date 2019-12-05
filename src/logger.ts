class Logger {
    error(...params) {
        console.error(params);
    }

    info(...params) {
        console.log(params);
    }

    warning(...params) {
        console.warn(params);
    }
}

export default new Logger();