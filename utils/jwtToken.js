// export const sendToken = (user, statusCode, res, message) => {
//     const token = user.getJWTToken();
    
//     const options = {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true, // Set httpOnly to true
//     };
  
//     res.status(statusCode).cookie("token", token, options).json({
//       success: true,
//       user,
//       message,
//       token,
//     });
//   };
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  
  // Parse the COOKIE_EXPIRE_DAYS value
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE_DAYS);

  if (isNaN(cookieExpireDays)) {
    return res.status(500).json({ success: false, message: "Invalid COOKIE_EXPIRE_DAYS value" });
  }

  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};