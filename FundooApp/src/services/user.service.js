import User from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

//login user
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data !== null) {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      var token = jwt.sign(
        { email: data.email, id: data._id },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('invalid password');
    }
  } else {
    throw new Error('invalid email');
  }
};

//register a new user
export const registerUser = async (body) => {
  console.log(body.password);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  console.log(hashPassword);
  body.password = hashPassword;
  const data = await User.create(body);
  return data;
};
