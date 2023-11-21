const responseMap = {
    missingInfo: { status: "Missing Info", code: 400 },
    unauthorized: { status: "Unauthorized", code: 401 },
    passwordEmailDuplicated: {
        status: "PasswordEmailDuplicated",
        code: 403,
    },
    emailUserNameDuplicated: {
        status: "EmailUserNameDuplicated",
        code: 403,
    },
    nonExistingUser: { status: "Non Existing User", code: 404 },
    existingUserEmail: { status: "Existing User Email", code: 409 },
    existingUserName: { status: "Existing User Name", code: 409 },
    unprocessableEntity: {
        status: "Unacceptable requirement",
        code: 422,
    },
    serverError: { status: "Internal server error", code: 500 },
};

module.exports = { responseMap };
