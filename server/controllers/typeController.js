const {Type} = require('../models/models')
const ApiError = require('../error/apiError')

class TypeController {
  async create(req, res) {
    const {name} = req.body
    const findType = await Type.findOne({where: {name}})
    if(findType) {
      return res.json({message: 'Такой тип уже существует'})
    }
    const type = await Type.create({name})
    return res.json(type)
  }
  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types)
  }
}

module.exports = new TypeController()