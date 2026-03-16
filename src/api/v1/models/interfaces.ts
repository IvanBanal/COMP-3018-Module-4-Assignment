export interface LoanApplication {
    id: number;
    applicant: string;
    amount: number;
    status: string;
    createdAt: string;
}

export interface AuthUser {
    uid: string;
    email: string;
    role?: string;
}

