export const errorHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";
    console.log({
        message: errMessage,
        status: errStatus,
        stack: err.stack,
    });
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack || "No stack trace available",
    });
}