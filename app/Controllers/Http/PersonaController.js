'use strict'

const Persona = use('App/Models/Persona') //Modelo Persona

const { validate } = use('Validator') //Validator

class PersonaController {

    async index({ params: { id }, request, response}){

        const persona = request.post().persona

        return response.status(200).json({
            persona: persona
        })
        

        
    }

    async create({ request,  response}){
        //const { Nombre, Apellidos, Edad, Email } = request.all()
        const validation = await validate(request.post(), {
            Nombre: 'required|min:3|max:255',
            Apellidos: 'required|min:3',
            Edad: 'required',
            Email: 'required|email|unique:personas,email'
        });
        if(validation.fails()){
            return validation.messages() 
        }
        
        const persona = new Persona()
        persona.Nombre = request.input('Nombre')
        persona.Apellidos = request.input('Apellidos')
        persona.Edad = request.input('Edad')
        persona.Email = request.input('Email')

        await persona.save()
        return response.status(200).json({
            mensaje: "Se ha insertado a la persona",
            persona: persona
        })

    }

    async update({ params: { id }, request, response}){
        
        const persona = request.post().persona

        const validation = await validate(request.all(), {
                Nombre: 'required|min:3|max:255',
                Apellidos: 'required|min:3',
                Edad: 'required',
                Email: 'required|email'
        });
        if(validation.fails()){
                return validation.messages() 
        }
        persona.Nombre = request.input('Nombre')
        persona.Apellidos = request.input('Apellidos')
        persona.Edad = request.input('Edad')
        persona.Email = request.input('Email')
        await persona.save()

        return response.status(200).json({
            mensaje: "La persona se actualizo correctamente", 
            persona: persona
        })
        

    }

    async delete({ params: { id }, request, response}){

        const persona = request.post().persona

        await persona.delete()

        return response.status(200).json({
            mensaje: "La persona se elimino correctamente", 
            persona: id
        })
        

    }

    

}

module.exports = PersonaController
