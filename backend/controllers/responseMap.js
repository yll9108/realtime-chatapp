const responseMap = {
    missingInfo: { status: "Missing Info", code: 400 },
    unauthorized: { status: "Unauthorized", code: 401 },
    unacceptableRequirement: {
        status: "Unacceptable requirement",
        code: 403,
    },
    nonExistingUser: { status: "Non Existing User", code: 404 },
    existingUser: { status: "Existing User", code: 409 },
    unprocessableEntity: {
        status: "Unacceptable requirement",
        code: 422,
    },
    serverError: { status: "Internal server error", code: 500 },
};

module.exports = { responseMap };
