import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("isAuthorized middleware", () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        // Arrange, Act & Assert
        req = { params: {} };
        res = { locals: {} };
        next = jest.fn();
    });

    it("should call next() if user's role is included", () => {
        // Arrange
        res.locals.role = "manager";
        const middleware = isAuthorized({ hasRole: ["manager", "admin"], allowSameUser: false });

        // Act
        middleware(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith();
    });

    it("should call next() if allowSameUser is true and uid matches id", () => {
        // Arrange
        res.locals.uid = "user123";
        req.params.id = "user123";
        const middleware = isAuthorized({ hasRole: ["manager"], allowSameUser: true });

        // Act
        middleware(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith();
    });

    it("should throw AuthorizationError if role is missing", () => {
        // Arrange
        res.locals.role = undefined;
        const middleware = isAuthorized({ hasRole: ["manager"], allowSameUser: false });

        // Act
        middleware(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(expect.any(AuthorizationError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: No role found");
        expect(error.code).toBe("ROLE_NOT_FOUND");
    });

    it("should throw AuthorizationError if role is not allowed", () => {
        // Arrange
        res.locals.role = "officer";
        const middleware = isAuthorized({ hasRole: ["manager"], allowSameUser: false });

        // Act
        middleware(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(expect.any(AuthorizationError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: Insufficient role");
        expect(error.code).toBe("INSUFFICIENT_ROLE");
    });
});