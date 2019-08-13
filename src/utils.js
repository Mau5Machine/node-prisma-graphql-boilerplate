const jwt = require("jsonwebtoken");
const APP_SECRET = "Sparkv2-dynaMo-graph-QL";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

exports.errorType = {
  LOGIN: {
    message: "Please check the username and password",
    statusCode: 400
  }
};
module.exports = {
  APP_SECRET,
  getUserId
};
