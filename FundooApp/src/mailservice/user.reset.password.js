const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '653847463940-0aunthtatkgv5dfpvrkas6tqq3f0vase.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04dztRMvtRoHVCgYIARAAGAQSNwF-L9IrQ17QPTVuHZhWNVx1iJASdNuetQa95hagqXuDXHWhvzAKjyEocvJQ-0ZhtKlnWxz44J8';

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(requestorEmail, token) {
  try {
    const acceessToken = await OAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: 'darshandyp@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: acceessToken
      }
    });
    let RESET_URL = `http://localhost:3000/api/v1/users/reset/${token}`;
    let PASSWORD_RESET_HTML = `<h2>Please click on the link to reset your password, <a href=${RESET_URL}> Reset Password</a> </h2>`;
    const mailOptions = {
      from: 'DARSHAN_D<darshandyp@gmail.com>',
      to: requestorEmail,
      subject: 'url for reset password reset',
      text: PASSWORD_RESET_HTML
    };

    const sentMailDetails = await transport.sendMail(mailOptions);

    return sentMailDetails;
  } catch (error) {}
}
