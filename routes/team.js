const express = require('express');
const router = express.Router();
const upload  = require('../multerUpload')
const { authAdmin } = require('../middleware/auth');
const { listTeam, detailMember, createMember, updateMember, deleteMember } = require('../controllers/team');

router.get('/', listTeam);
router.get('/:id', detailMember);
router.post('/', authAdmin, upload.single('picture'), createMember);
router.put('/:id', authAdmin, upload.single('picture'), updateMember);
router.delete('/:id', authAdmin, deleteMember);

module.exports = router;
