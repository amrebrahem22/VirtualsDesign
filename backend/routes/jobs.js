const express = require('express');
const router = express.Router();
const { authAdmin } = require('../middleware/auth');
const { listJobs, detailJob, deleteJob, createJob, updateJob } = require('../controllers/jobs');

router.get('/', authAdmin, listJobs);
router.post('/', authAdmin, createJob);
router.get('/:id', authAdmin, detailJob);
router.put('/:id', authAdmin, updateJob);
router.delete('/:id', authAdmin, deleteJob);

module.exports = router;
