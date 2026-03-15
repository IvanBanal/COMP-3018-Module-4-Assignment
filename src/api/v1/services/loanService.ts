import { LoanApplication } from "../models/interfaces";
import { loans } from "../data/loanData";

/**
 * Get all loan applications.
 * @returns {LoanApplication[]} Array of all loans.
 */
export const getAllLoans = (): LoanApplication[] => loans;

/**
 * Get a loan application by its ID.
 * @param {number} id - The ID of the loan to retrieve.
 * @throws {Error} Throws an error if the loan is not found.
 * @returns {LoanApplication} The loan with the specified ID.
 */
export const getLoanById = (id: number): LoanApplication => {
    const loan = loans.find((loan) => loan.id === id);

    if (!loan) throw new Error("Loan application not found");
    return loan;
};