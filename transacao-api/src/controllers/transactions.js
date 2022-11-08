const knex = require("../database/connection");
const { schemaRegisterTransactions } = require('../validations/schemaTransactions')

const registerTransaction = async (req, res) => {
    const { user } = req;
    const { valor, descricao, tipo } = req.body;
    let currentTry = 0;

    while (currentTry < 6 ) {
        try {
            await schemaRegisterTransactions.validate(req.body);
            if (tipo !== 'entrada' && tipo !== 'saida') {
                return res.status(400).json("o tipo da transação deve ser 'entrada' ou 'saida'");
            }

            const transaction = await knex('transacoes')
                .insert({
                    "valor": valor.toFixed(2),
                    descricao,
                    tipo,
                    "usuario_id": user[0].id
                });

            if (transaction.length === 0) {
                return res.status(400).json("Não foi possivel cadastrar a transação");
            }

            return res.status(201).json("Transação efetuada com sucesso")

        } catch (e) {
            currentTry++;
            console.log(currentTry);
            if (currentTry === 5) {
                return res.status(500).json(e.message);
            }
        }
    }
};

module.exports = {
    registerTransaction
}