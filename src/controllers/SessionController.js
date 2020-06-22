const jwt = require('jsonwebtoken');
const bcrypts = require('bcryptjs')
const knex = require('../database')
const auth = require('../config/auth')
const Yup = require('yup');

module.exports = {
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            cpf: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Erro de validação!'})
        }

        const {email, cpf} = req.body;

        const user = await knex('users').where({email}).first();

        if(!user){
            return res.status(401).json('Usuário não identificado.')
        }

        if(!await bcrypts.compare(cpf, user.cpf)){
            return res.status(401).json({error: 'Senha inválida'})
        }

     
         const {id , nome} = user;
        
        
        return res.json({
        user: {
            id,
            nome,
            email, 
        },
        token: jwt.sign({id}, auth.secret , {
            expiresIn: auth.expiresIn
        })
    
        })
    
    
    }
}