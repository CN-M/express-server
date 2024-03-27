import express from "express";

const router = express.Router();

import { DELETE, GET, POST, PUT } from "../controllers/mainController";

router.route("/").get(GET).post(POST).put(PUT).delete(DELETE);

export default router;
