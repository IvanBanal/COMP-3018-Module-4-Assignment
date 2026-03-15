import { LoanApplication } from "../models/interfaces";
import { loans } from "../data/loanData";

/**
 * Get all loan applications.
 * @returns {LoanApplication[]} Array of all loans.
 */
export const getAllLoans = (): LoanApplication[] => loans;

