import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        // Arrange, Act & Assert
        req = { headers: {} };
        res = { locals: {} };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it("should attach uid and role and call next() for a valid token", async () => {
        // Arrange
        req.headers.authorization = "Bearer valid-token";
        (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "123", role: "admin" });

        // Act
        await authenticate(req, res, next);

        // Assert
        expect(res.locals.uid).toBe("123");
        expect(res.locals.role).toBe("admin");
        expect(next).toHaveBeenCalledWith();
    });

    it("should throw AuthenticationError if Authorization header is missing", async () => {
        // Arrange

        // Act
        await authenticate(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
    });

    it("should throw AuthenticationError if token is invalid", async () => {
        // Arrange
        req.headers.authorization = "Bearer invalid-token";
        (auth.verifyIdToken as jest.Mock).mockRejectedValue(new Error("Firebase token error"));

        // Act
        await authenticate(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
        const error = next.mock.calls[0][0];
        expect(error.message).toContain("Unauthorized:");
        expect(error.code).toBe("UNKNOWN_ERROR"); // fallback from getErrorCode
    });

    it("should throw AuthenticationError if Authorization header is malformed", async () => {
        // Arrange
        req.headers.authorization = "InvalidHeader abc123";

        // Act
        await authenticate(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
    });
});