import {Request, Response, NextFunction} from "express";
import * as loanService from "../services/loanService";
import { HTTP_STATUS } from "../../../constants/httpConstants";


/**
 * Get all loan applications.
 */
export const getAllLoans = (req: Request, res: Response) => {
    const data = loanService.getAllLoans();

    res.status(HTTP_STATUS.OK).json({
        success: true,
        count: data.length,
        data,
    });
};

/**
 * Get a single loan application by ID.
 */
export const getLoanById = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const data = loanService.getLoanById(id);
    
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new loan application.
 */
export const createLoan = (req: Request, res: Response) => {
    const { applicant, amount } = req.body;
    const data = loanService.createLoan(applicant, amount);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Loan application created",
        data
    });
};

/**
 * Updates the status of a loan application.
 */
export const updateLoan = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const data = loanService.updateLoan(id, status);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application updated",
            data
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a loan application by ID.
 */
export const deleteLoan = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        loanService.deleteLoan(id);
    
        res.status(HTTP_STATUS.OK).json({
            success: true, 
            message: "Loan application deleted"
        });
    } catch (error) {
        next(error);
    }
};




