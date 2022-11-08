const yup = require('./yup');

const schemaRegisterUsers = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required()
});

const schemaUpdateUsers = yup.object().shape({
    nome: yup.string(),
    email: yup.string().email(),
    senha: yup.string()
});

const schemaLoginUsers = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required()
})

module.exports = {
    schemaRegisterUsers,
    schemaUpdateUsers,
    schemaLoginUsers
}