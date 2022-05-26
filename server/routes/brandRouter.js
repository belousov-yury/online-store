const Router = require('express')
const router = Router()
const brandController = require('../controllers/brandController')
const authMiddleWare = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/',[authMiddleWare,checkRoleMiddleware('ADMIN')],brandController.create)
router.get('/',brandController.getAll)

module.exports = router