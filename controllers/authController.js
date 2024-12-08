const bcrypt = require('bcrypt');
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
});

exports.register = async (req, res) => {
    const {error, value} = authSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: 'Dados inválidos', details: error.details});
    }

    const hashedPassoword = await bcrypt.hash(value.password, 10);

    try {
        const newUser = await User.create({
            username: value.username,
            password: hashedPassword
        });
        res.status(201).json({message: 'Usuário criado com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar o usuário'});
    }
};

exports.login = async (req, res) => {
    const {error, value} = authSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: 'Dados inválidos', details: error.details});
    }

    try {
        const user = await User.findOne({where: {username: value.username}});
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }

        const validPassword = await bcrypt.compare(value.password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: 'Senha incorreta'});
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({message: 'Login bem-sucedido', token});
    } catch (error) {
        res.status(500).json({message: 'Erro ao fazer login', error})
    }
}