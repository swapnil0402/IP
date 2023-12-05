const express = require('express');
const router = express.Router();
const judgeController = require('./judgeController');

// View assigned cases
router.get('/:judgeId/assignedCases', judgeController.viewAssignedCases);

// Prioritize cases
router.put('/:judgeId/prioritizeCases', judgeController.prioritizeCases);

module.exports = router;
