const knex = require("../database/connection");
const securePassword = require("secure-password");
const pwd = securePassword();

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usedEmail = await knex('usuarios').where('email', email);
        if (usedEmail.length > 0) {
            return res.status(400).json("Já existe usuário cadastrado com o email informado.");
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const user = await knex('usuarios')
            .insert({
                'nome': nome,
                'email': email,
                'senha': hash
            })

        if (user.length === 0) {
            return res.status(400).json("Erro no cadastro");
        }

        return res.status(201).json("usuário cadastrado com sucesso");
    } catch (e) {
        return res.status(500).json(e.message);
    }
};

module.exports = {
    registerUser
}