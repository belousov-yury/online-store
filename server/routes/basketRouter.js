const Router = require('express')
const router = Router()
const basketController = require('../controllers/basketController')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/', basketController.addDevice)
router.get('/', basketController.getAll)

module.exports = router