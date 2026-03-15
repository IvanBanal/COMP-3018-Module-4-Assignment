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



