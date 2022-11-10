import User from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import { sendMail } from '../mailservice/user.reset.password';

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
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  const data = await User.create(body);
  return data;
};

//forgot password

export const forgotPassword = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data !== null) {
    let token = jwt.sign(
      { email: data.email, id: data._id },
      process.env.SECRET_KEY_RESET
    );

    sendMail(body.email, token);
    return;
  } else {
    throw new Error('invalid email');
  }
};

//update reset password
export const resetPassword = async (body) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  const data = await User.findByIdAndUpdate(
    { _id: body.id, email: body.email },
    body,
    {
      new: true
    }
  );
  return data;
};
