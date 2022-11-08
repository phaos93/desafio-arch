const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        const token = authorization.replace("Bearer", "").trim();
        const { id } = jwt.verify(token, process.env.PASSWORD_SECRET);
        const currentUser = await knex('usuarios').where('id', id);

        if (currentUser.length === 0) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...user } = currentUser;

        req.user = user;

        next();
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

module.exports = verifyLogin