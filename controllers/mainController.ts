import { Request, Response } from "express";

type UserData = {
  name: string;
  occupation: string;
  age: number;
};

export const GET = (req: Request, res: Response) => {
  const { name } = req.query;

  if (name) {
    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(200).json({ message: "Hello world" });
  }
};

export const POST = (req: Request, res: Response) => {
  const { name, occupation, age }: UserData = req.body;

  res.status(200).json({
    message: `Hey there, ${name}. What's it like being a ${occupation} at the age of ${age}?`,
  });
};

export const PUT = (req: Request, res: Response) => {
  res.status(200).json({ message: "Item Updated Successfully" });
};

export const DELETE = (req: Request, res: Response) => {
  res.status(200).json({ message: "Item Deleted Succesfully" });
};
