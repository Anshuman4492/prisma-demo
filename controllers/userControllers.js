// Bring in prisma and cookie token
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";

// User Sign Up
export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      throw new Error("Please provide all required fields");
    const user = await prisma.user.create({
      data: { name: name, email: email, password: password },
    });
    // Send the token in cookie
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// User login
export const userLogin = async (req, res, next) => {
  try {
    // take info from user
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    // Find User with this email in our DBa
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // When there is no user
    if (!user) {
      throw new Error("User not found!");
    }
    // Password given is incorrect
    if (user.password !== password) {
      throw new Error("Password is incorrect!");
    }

    // User is there and validated
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// logout

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Fetch All Users
export const fetchAllUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error.message);
  }
};
