import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// create user
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        imageURL: "https://cdn-icons-png.flaticon.com/512/9668/9668879.png",
      },
    });

    res.status(201).json({ message: "User registered successfully" });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JSON Web Token (JWT) for the user
    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        bio: user.bio,
        location: user.location,
        imageURL: user.imageURL,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        bio: user.bio,
        location: user.location,
        imageURL: user.imageURL,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );

    // // Store tokens in the database
    // await prisma.token.create({
    //   data: {
    //     tokenValue: accessToken,
    //     userId: user.id,
    //     tokenType: "access",
    //     expiration: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
    //   },
    // });

    // await prisma.token.create({
    //   data: {
    //     tokenValue: refreshToken,
    //     userId: user.id,
    //     tokenType: "refresh",
    //     expiration: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week
    //   },
    // });

    res.json({ accessToken, refreshToken });
    // res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
