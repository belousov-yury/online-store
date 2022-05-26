const {Brand} = require('../models/models');

class BrandController {
  async create(req, res) {
    const {name} = req.body
    const findBrand = await Brand.findOne({where: {name}})
    if(findBrand) {
      return res.json({message: 'Такой тип уже существует'})
    }
    const brand = await Brand.create({name})
    return res.json(brand)
  }

  async getAll(req, res) {
    const brands = await Brand.findAll()
    res.json(brands)
  }
}

module.exports = new BrandController()