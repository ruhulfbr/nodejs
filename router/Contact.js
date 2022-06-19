const router = require('express').Router()
const contact = require('../controller/Contact')

router.get('/', contact.list);
router.post('/', contact.create);
router.get('/:contactid', contact.show);
router.put('/:contactid', contact.update);
router.delete('/:contactid', contact.delete);

module.exports = router