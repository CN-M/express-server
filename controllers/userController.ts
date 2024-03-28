import { Request, Response } from "express";
import { prisma } from "../config/db";

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

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, email, name } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email,
      name,
    },
  });

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(deletedUser);
};
