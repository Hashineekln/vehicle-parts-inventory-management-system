import express from "express";
import { register, login, logout } from "../controllers/auth.js";


const router = express.Router();

router.post("Register",register);
router.post("Login",login);
router.post("Logout",logout);

export default router;