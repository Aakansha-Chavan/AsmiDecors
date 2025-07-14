// utils/ExpressError.js
class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // Call parent constructor (Error)
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
