import jwt from 'jsonwebtoken';

export const getToken = async(userId) => {
  try {
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
    console.log("Generated token:", token);
    return token;  
  } catch (error) {
    console.error("Error generating token", error);
  }
};