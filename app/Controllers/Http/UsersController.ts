import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { md5 } from 'js-md5'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    let senhaCrip = md5(senha)
    const newUser = { nome, cpf, senha }
    newUser.senha = senhaCrip
    User.create(newUser)
    return response.status(201).send(newUser)
  }

  public async show({ params, response }: HttpContextContract) {
    let userEncontrado = await User.findByOrFail('id', params.id)
    if (userEncontrado === undefined) return response.status(404)
    return userEncontrado
  }
  public async update({ request, params, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    let userEncontrado = await User.findByOrFail('id', params.id)
    if (!userEncontrado) {
      return response.status(404)
    } else {
      if (nome !== undefined) {
        userEncontrado.nome = nome
      }
      if (cpf !== undefined) {
        userEncontrado.cpf = cpf
      }
      if (senha !== undefined) {
        userEncontrado.senha = senha
      }
      await userEncontrado.save()
      await userEncontrado.merge({ updatedAt: DateTime.local() }).save()
      return response.status(200).send(userEncontrado)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    let userEncontrado = await User.findByOrFail('id', params.id)
    if (!userEncontrado) return response.status(404)
    userEncontrado.delete()
    return response.status(204)
  }
}
