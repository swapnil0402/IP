const Judge = require('./judgeModel');
const Case = require('./caseModel');

// View assigned cases
const viewAssignedCases = async (req, res) => {
  try {
    const judge = await Judge.findById(req.params.judgeId).populate('assignedCases');
    res.status(200).json(judge.assignedCases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Prioritize cases
const prioritizeCases = async (req, res) => {
  try {
    const judge = await Judge.findById(req.params.judgeId);
    judge.assignedCases.forEach(async (caseId) => {
      const caseToUpdate = await Case.findById(caseId);
      caseToUpdate.priority = req.body.priority; // Set priority based on request body
      await caseToUpdate.save();
    });
    res.status(200).json({ message: 'Cases prioritized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { viewAssignedCases, prioritizeCases };
