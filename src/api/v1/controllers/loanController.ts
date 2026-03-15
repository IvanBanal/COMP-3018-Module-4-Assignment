import {Request, Response} from "express";
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
export const getLoanById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = loanService.getLoanById(id);

    if (!data) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: "Loan application not found"
        });
        return;
    }
    res.status(HTTP_STATUS.OK).json({
        succces: true,
        data
    });
};






