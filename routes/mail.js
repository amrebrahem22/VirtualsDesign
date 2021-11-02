const router = require('express').Router();
const { contact, deleteMail, listMails } = require('../controllers/mail')

router.get('/', listMails)
router.post('/', contact)
router.delete('/:id', deleteMail)

module.exports = router;