const express = require('express');
const router = express.Router();
const upload  = require('../multerUpload')
const { authAdmin } = require('../middleware/auth');
const { createPortfolio, updatePortfolio, deletePortfolio, detailPortfolio, listPortfolio } = require('../controllers/portfolio')

router.get('/', listPortfolio)
router.post('/', authAdmin, upload.single('thumb'), createPortfolio)
router.get('/:id', detailPortfolio)
router.put('/:id', authAdmin, upload.single('thumb'), updatePortfolio)
router.delete('/:id', authAdmin, deletePortfolio)

module.exports = router;
