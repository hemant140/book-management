export const notFound = (req,res,next)=>{
    const error = new Error(`Url Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error)
}

export const errorHandler = (err,req,res,next)=>{
    console.log("Error handler middleware !")
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);

    res.json({
        messsage:err.messsage,
        stack:process.env.NODE_ENV== "Production"?null:err.stack,
        errorObj:err
    })
}