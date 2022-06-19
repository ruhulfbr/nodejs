const router = require('express').Router()
const contact = require('../controller/Contact')

router.get('/', contact.list);
router.post('/', contact.create);
router.get('/:id', contact.show);
router.put('/:id', contact.update);
router.delete('/:id', contact.delete);

module.exports = router