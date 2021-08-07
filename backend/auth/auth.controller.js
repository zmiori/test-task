const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();
const Users = require("../repository/users");
const { HttpCode } = require("../helpers/constants");

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  console.log(userData.data);
  const user = await Users.findUserByEmail(userData.data.email);

  if (user) {
    await Users.updateToken(user.id, tokenData.data.access_token);
  } else {
    const newUserData = {
      id: userData.data.id,
      email: userData.data.email,
      name: userData.data.name,
      avatarURL: userData.data.picture,
      accessToken: tokenData.data.access_token,
      refreshToken: tokenData.data.refresh_token,
    };
    await Users.createUser(newUserData);
  }

  return res.redirect(
    `${process.env.FRONTEND_URL}?accessToken=${tokenData.data.access_token}&refreshToKen=${tokenData.data.refresh_token}`
  );
};

exports.logout = async (req, res) => {
  await Users.updateToken(req.body.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

exports.getUser = async (req, res) => {
  const user = await Users.findUserByAccessToken(req.body.accessToken);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: user,
  });
};

exports.updateUserFeed = async (req, res) => {
  const { feed } = await Users.updateFeed(req.user.id, req.body);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    feed: feed,
  });
};
