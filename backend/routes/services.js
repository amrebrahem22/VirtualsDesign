const express = require('express');
const router = express.Router();
const { authAdmin } = require('../middleware/auth');
const { listServiceItem, createServiceItem, detailServiceItem, updateServiceItem, deleteServiceItem, listService, detailService, deleteService, updateService, createService, listServiceItemAll } = require('../controllers/services')

router.get('/', listService);
router.post('/', authAdmin, createService);
router.get('/:id',  detailService);
router.put('/:id', authAdmin, updateService);
router.delete('/:id', authAdmin, deleteService);

router.get('/item/all', listServiceItemAll);
router.get('/item/:id', listServiceItem);
router.post('/item', authAdmin, createServiceItem);
router.get('/item/:id',  detailServiceItem);
router.put('/item/:id', authAdmin, updateServiceItem);
router.delete('/item/:id', authAdmin, deleteServiceItem);

module.exports = router;
