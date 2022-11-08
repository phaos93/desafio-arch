const knex = require("../database/connection");

const getBalance = async (req, res) => {
    const { user } = req;
    try {
        const cashIn = await knex('transacoes').where({'usuario_id': user[0].id, 'tipo': 'entrada'}).sum('valor');
        const cashOut = await knex('transacoes').where({'usuario_id': user[0].id, 'tipo': 'saida'}).sum('valor');
        const balance = (cashIn[0].sum - cashOut[0].sum)

        return res.status(200).json(`saldo: R$ ${balance}`)

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    getBalance
}