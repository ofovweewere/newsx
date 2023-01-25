export const errorHandler = (data, res, code = 400) => {
  if (data.code === 11000) {
    res.status(code).json({
      hasError: true,
      errorMessage: "User already exists",
    });
  } else {
    res.status(code).json({
      hasError: true,
      errorMessage: data,
    });
  }
};

export const responseHandler = (data, res, code = 400) => {
  res.status(code).json({
    hasError: false,
    body: data,
  });
};

export const validateAllOnce = (fields) => {
  for (let key in fields) {
    if (fields[key] === "") {
      throw new Error(`${key} required`);
    }
  }
};

export const getValue = (obj, path, defaultValue) => {
  try {
    if (!(obj instanceof Array)) {
      let myValue = obj;
      for (let key of path) {
        if (!(key in myValue)) {
          return defaultValue;
        } else {
          myValue = myValue[key];
        }
      }
      return myValue;
    }
  } catch (error) {
    console.log({ error });
    return defaultValue;
  }
};
