const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (cv) => {
        let validator = new Validator();
        let cvSchema = {
            type: 'object',
            properties: {
                titre: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                    errorMessage: 'Resume\'s (cv) "title" is missing or is longuer than 64 characters'
                },
                adresse: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 32,
                    errorMessage: 'Resume\'s (cv) " is missing or incorrect'
                },
                email: {
                    type: 'email',
                    format: 'email',
                    errorMessage: 'User email is missing or incorrect'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    errorMessage: "User's password, must contain at least one uppercase letter and one digit",
                    pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$'
                },
                role: {
                    type: 'string',
                    errorMessage: "User's role must be either user or admin"
                }
            },
            required: ['nom', 'prenom', 'email', 'password']
        };
        let result = validator.validate(user, userSchema);

        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = '';

            result.errors.forEach((error) => {
                failedInputs += (error.schema.error || error.message) + ', ';
            });
            return {
                message: failedInputs
            };
        }
    }
};
