const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // Hash the password from the args object
  const password = await bcrypt.hash(args.password, 10);
  // Create a user with prisma
  const user = await context.prisma.createUser({ ...args, password });
  // Sign a generated token for auth
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
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
    throw new Error("No such user was found");
  }
  // Validate the user
  const valid = await bcrypt.compare(args.password, user.password);
  // Check if user is valid login
  if (!valid) {
    throw new Error("Invalid password");
  }
  // Sign the token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // Return the token and the user
  return {
    token,
    user
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}
module.exports = {
  signup,
  login,
  post,
  vote
};
