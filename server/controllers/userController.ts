import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";

require("dotenv").config();

const { SECRET } = process.env;

const generateToken = (id: number) => {
  return jwt.sign({ id }, SECRET!, { expiresIn: "5d" });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, username } = req.body;

    if (!email || !name || !password || !username) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const emailTaken = await prisma.user.findFirst({
      where: { email },
    });

    const usernameTaken = await prisma.user.findFirst({
      where: { email },
    });

    if (emailTaken || usernameTaken) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      const { id, name, email } = newUser;

      const token = generateToken(id);

      return res.status(201).json({
        id,
        username,
        name,
        email,
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { id, name, email: userEmail } = user;
    const token = generateToken(id);

    return res.status(201).json({
      id,
      name,
      email: userEmail,
      token,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findMany({
    where: { id: Number(id) },
  });

  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!req.user) {
      return res
        .status(400)
        .json({ error: "Not authoriized, please login or register" });
    }

    const { id: userId } = req.user;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
      select: { name: true, username: true, email: true },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ error: "Not authoriized, please login or register" });
  }

  const { id: userId } = req.user;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: { name: true, username: true, email: true },
    });

    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
