// utils/catchAsync.js
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next); // Catch any errors and pass them to the next middleware (error handler)
    }
}
