const { Validator } = require("jsonschema");

module.exports = {
    verifyCv: (cv) => {
        let validator = new Validator();
        let cvSchema = {
            type: "object",
            properties: {
                titre: {
                    type: "string",
                    minLength: 1,
                    maxLength: 64,
                    errorMessage:
                        'Resume\'s (cv) "title" is missing or is longuer than 64 characters',
                },
                adresse: {
                    type: "string",
                    minLength: 1,
                    maxLength: 32,
                    errorMessage:
                        'Resume\'s (cv) "adresse" is missing or longer than 32 characters',
                },
                desciption: {
                    type: "string",
                    maxLength: 128,
                    errorMessage:
                        'Resume\'s (cv) "description" is missing or longer than 128 characters',
                },
                techSkills: {
                    type: "array",
                    items: {
                        type: "string",
                        minLength: 1,
                        maxLength: 20,
                    },
                    errorMessage:
                        "techSkills array items cannot be longer than 20 characters",
                },
                softSkills: {
                    type: "array",
                    items: {
                        type: "string",
                        minLength: 1,
                        maxLength: 20,
                    },
                    errorMessage:
                        "softSkills array items cannot longer than 20 characters",
                },
                certifications: {
                    type: "array",
                    items: {
                        type: "string",
                        minLength: 1,
                        maxLength: 50,
                    },
                    errorMessage:
                        "certifications array items connot be longer than 50 characters",
                },
                expPro: {
                    // type: "object",
                    // properties: {
                    //     entreprises: {
                    //         type: "array",
                    //         items: {
                    //             type: "string",
                    //             minLength: 1,
                    //             maxLength: 50,
                    //         },
                    //         errorMessage:
                    //             "expPro.entreprise missing or item longer than 50 characters",
                    //     },
                    //     poste: {
                    //         type: "array",
                    //         items: {
                    //             type: "string",
                    //             minLength: 1,
                    //             maxLength: 20,
                    //         },
                    //         errorMessage:
                    //             "expPro.poste missing or item longer than 20 characters",
                    //     },
                    //     description: {
                    //         type: "array",
                    //         items: {
                    //             type: "string",
                    //             minLength: 1,
                    //             maxLength: 200,
                    //         },
                    //         errorMessage:
                    //             "expPro.description missing or item longer than 100 characters",
                    //     },
                    // },
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            entreprises: {
                                type: "string",
                                minLength: 1,
                                maxLength: 50,
                                errorMessage:
                                    "expPro.entreprise missing or item longer than 50 characters",
                            },
                            poste: {
                                type: "string",
                                minLength: 1,
                                maxLength: 20,
                                errorMessage:
                                    "expPro.poste missing or item longer than 20 characters",
                            },
                            description: {
                                type: "string",
                                minLength: 1,
                                maxLength: 200,
                                errorMessage:
                                    "expPro.description missing or item longer than 100 characters",
                            },
                        },
                        required: ["entreprise", "poste", "description"],
                    },
                },
                visible: {
                    type: "boolean",
                    errorMessage: "visible must be true or false",
                },
                author: {
                    type: "number",
                    errorMessage: "author must be the id of the user",
                },
            },
            required: [
                "titre",
                "techSkills",
                "softSkills",
                "certifications",
                "expPro",
                "visible",
                "author",
            ],
        };
        let result = validator.validate(cv, cvSchema);

        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = "";

            result.errors.forEach((error) => {
                failedInputs += (error.schema.error || error.message) + ", ";
            });
            return {
                message: failedInputs,
            };
        }
    },
};
