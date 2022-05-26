const Router = require('express')
const router = Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/', [authMiddleWare, checkRoleMiddleware('ADMIN')], typeController.create)
router.get('/', typeController.getAll)

module.exports = router