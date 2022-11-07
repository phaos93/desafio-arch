const knex = require("../database/connection");
const securePassword = require("secure-password");
const pwd = securePassword();
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userExists = await knex('usuarios').where('email', email);

        if (userExists.length === 0) {
            return res.status(404).json("Usuario não encontrado!");
        }

        const user = userExists[0];

        const result = await pwd.verify(
            Buffer.from(senha),
            Buffer.from(user.senha, "hex")
        );

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json("Usuário e/ou senha inválido(s).");
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    await knex('usuarios').where('email', email).update({ 'senha': hash });
                } catch { }
                break;
        }

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
            process.env.PASSWORD_SECRET,
            {
                expiresIn: "3h",
            }
        );

        return res.status(200).send({
            "usuario": {
                "id": user.id,
                "nome": user.nome,
                "email": user.email
            },
            "token": token
        });
    } catch (e) {
        return res.status(500).json(e.message);
    }
};

const updateUser = async (req, res) => {
    const { user } = req
    const { nome, email, senha} = req.body;

    try {
        const usedEmail = await knex('usuarios').where('email', email);
        if (usedEmail.length > 0 && usedEmail[0].email !== user[0].email) {
            return res.status(400).json("Já existe usuário cadastrado com o email informado.");
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const loggedUser = await knex('usuarios')
            .where('id', user[0].id)
            .update({
                'nome': nome,
                'email': email,
                'senha': hash
            })

        if (loggedUser.length === 0) {
            return res.status(400).json("Erro na atualização do usuário");
        }

        return res.status(200).json("usuário atualizado com sucesso");
    } catch (e) {
        return res.status(500).json(e.message);
    }
};


module.exports = {
    registerUser,
    loginUser,
    updateUser
}