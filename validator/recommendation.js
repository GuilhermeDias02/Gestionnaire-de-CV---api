const { Validator } = require("jsonschema");

module.exports = {
    verifyRecomm: (recommendation) => {
        let validator = new Validator();
        let recomSchema = {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    minLength: 1,
                    maxLength: 200,
                    errorMessage: "Message missing or longuer than 200 characters",
                },
                author: {
                    type: "number",
                    errorMessage: "A user id must be specified"
                },
                cv: {
                    type: "number",
                    errorMessage: "A cv id must be specified"
                }
            },
            required: ["message", "author", "cv"]
        };

        let result = validator.validate(recommendation, recomSchema);

        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = "";

            result.errors.forEach((error) => {
                failedInputs += (error.schema.error || error.message) + ", ";
            });
            return {
                message: failedInputs,
            };
        }
    }
}