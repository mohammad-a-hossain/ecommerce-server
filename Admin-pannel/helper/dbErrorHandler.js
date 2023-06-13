

exports.notFound=(req,res)=>{
    const error = new Error(`not found: ${req.originalUrl}`)
    res.status(404)
   // next()
  }
  
  exports.errorHandler=(req,res)=>{
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: "fail",
    message: err?.message,
    stack: err?.stack,
  });
  
  }

