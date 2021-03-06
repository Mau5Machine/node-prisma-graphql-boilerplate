const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

async function signup(parent, args, context, info) {
  if (args.name.length < 1) {
    throw new Error("No name provided");
  }
  if (!args.email) {
    throw new Error("No email provided");
  }
  if (args.username.length < 1) {
    throw new Error("No username provided");
  }
  if (args.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  // Hash the password from the args object
  const password = await bcrypt.hash(args.password, 10);
  // Create a user with prisma
  const user = await context.prisma.createUser({ ...args, password });
  // Sign a generated token for auth
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      userId: user.id
    },
    APP_SECRET
  );
  // return the token and the user
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  // Grab the user from prisma
  const user = await context.prisma.user({ username: args.username });
  // Check if user exists
  if (!user) {
    throw new Error("User does not exist");
  }
  // Validate the user
  const valid = await bcrypt.compare(args.password, user.password);
  // Check if user is valid login
  if (!valid) {
    throw new Error("Invalid password");
  }
  // Sign the token
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      userId: user.id
    },
    APP_SECRET
  );
  // Return the token and the user
  return {
    token,
    user
  };
}

module.exports = {
  signup,
  login
};
