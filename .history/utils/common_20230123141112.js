export const errorHandler = (data, res, code = 400){
    res.status(code).json({
        hasError: true,
        errorMessage: data
    })
}

export const responseHandler = (data, res, code = 400){
    res.status(code).json({
        hasError: false,
        body: data
    })
}

export const validateAllOnce = (fields)=>{
    for(let key in fields){
        if(fields[key] === ""){
            throw `${key} required`
        }
    }
}