const yup = require('./yup');

const schemaRegisterTransactions = yup.object().shape({
    valor: yup.number().required(),
    descricao: yup.string().required(),
    tipo: yup.string().required()
});


module.exports = {
    schemaRegisterTransactions
}