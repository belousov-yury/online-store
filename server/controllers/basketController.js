const ApiError = require('../error/apiError')

class BasketController {

  async addDevice(req, res, next) {
    const {deviceId, userId} = req.body
    console.log(deviceId, userId)
    console.log(req.body)

    return res.json({message: 'kek'})
  }
  async getAll(req, res, next) {

  }

}

module.exports = new BasketController()