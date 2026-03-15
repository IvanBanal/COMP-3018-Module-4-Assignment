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
    loanController.getAllLoans
);

// Get loan by ID.
router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    loanController.getLoanById
);

// POST create loan.
router.post(
    "/", 
    authenticate, 
    isAuthorized({ hasRole: ["manager", "admin"] }),
    loanController.createLoan
);

// PUT update loan.
router.put(
    "/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["manager", "admin"] }),
    loanController.updateLoan  
);

// DELETE loan (admin only).
router.delete(
    "/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    loanController.deleteLoan
);
