const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (user) => {
        let validator = new Validator();
        let userSchema = {
            type: 'object',
            properties: {
                nom: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    errorMessage: 'User "nom" is missing or incorrect'
                },
                prenom: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    errorMessage: 'User "prenom" is missing or incorrect'
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
                cvs: {
                    type: 'array',
                    errorMessage: "Error in cvs array"
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
