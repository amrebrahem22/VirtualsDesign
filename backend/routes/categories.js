const express = require('express');
const router = express.Router();
const {authAdmin} = require('../middleware/auth');
const {createCategory, updateCategory, deleteCategory, ListCategories} = require('../controllers/categories');

router.get('/', authAdmin, ListCategories);
router.post('/', authAdmin, createCategory);
router.put('/:id', authAdmin, updateCategory);
router.delete('/:id', authAdmin, deleteCategory);

module.exports = router