import { Router } from "express";
import * as loanController from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = Router();

// Get all loans.
router.get(
    "/", 
    authenticate, 
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    loan
);