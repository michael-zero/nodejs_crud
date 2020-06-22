const knex = require('../database')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const Yup = require('yup');



module.exports = {
   async index(req, res){
        const users = await knex('users').select('*');
        
        return res.json(users);
    },

    async show(req, res){
        const {id} = req.params;

        const user = await knex('users').where({id}).first();



        if(!user){
            return res.json('Usuário não identificado.')
        }

        
        return res.json(user);
    },

    async create(req, res){

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            cpf: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Erro de validação'})
        }

        
        const {nome, email, cpf} = req.body;


        const userExists = await knex('users').where({email})
        .first();

        if(userExists){
            return res.status(400).json({error: 'Usuário já cadastrado'});
        }

        const id = crypto.randomBytes(4).toString('HEX');

        const cpf_hash = (await bcrypt.hash(cpf, 8)).toString('HEX');

        const user = {
            id,
            nome,
            email,
            cpf: cpf_hash
        }

        await knex('users').insert(user);

        

        return res.json({id})

    },

    async delete(req, res){
       
        const id_req = req.userId;

        const user = await knex('users')
        .where({id : id_req})
        .first();  

        if(!user){
            return res.status(401).json('Você não é o usuário!')
        }

        await knex('users')
        .del()
        .where({id:id_req});

        return res.status(204).send();
        

       
    },
    
    async update(req, res){


        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            cpf: Yup.string()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Erro de validação'})
        }
            
        const {nome} = req.body;
        const id_req = req.userId;

        const user = await knex('users')
        .where({id : id_req})
        .first();  

        if(!user){
            return res.status(401).json('Você não é o usuário!')
        }

        await knex('users')
        .where({id: id_req})
        .update({nome})

        return res.json({
            id_req,
            nome
        })
        
    }


}