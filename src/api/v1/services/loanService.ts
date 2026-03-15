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

/**
 * Creates a new loan application.
 * @param {string} applicant - Name of the applicant.
 * @param {number} amount - Loan amount requested.
 * @returns {LoanApplication} The newly created loan.
 */
export const createLoan = (applicant: string, amount: number): LoanApplication => {
    const newLoan: LoanApplication = {
        id: loans.length + 1,
        applicant, 
        amount,
        status: "pending",
        createdAt: new Date().toISOString()
    };
    loans.push(newLoan);
    return newLoan;
};

/**
 * Updates the status of a loan application.
 * @param {number} id - The ID of the loan to update.
 * @param {string} status - The new status of the loan.
 * @throws {Error} Throws an error if the loan is not found.
 * @returns {LoanApplication} The updated loan.
 */
export const updateLoan = (id: number, status: string): LoanApplication => {
    const loan = getLoanById(id); 
    loan.status = status;
    return loan;
};