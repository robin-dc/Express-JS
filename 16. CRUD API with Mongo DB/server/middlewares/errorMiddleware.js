const errorHandler = (err, req, res, next) => {
    console.log("Error Handled Successfully")
    res.status(err.statusCode || 500)
    res.json({
        message: err.message || "Something went wrong!",
        statusCode: err.statusCode || 500,
        stack: process.env.NODE_ENV !== "production" && err.stack
    })
    next()
}
module.exports = errorHandler
