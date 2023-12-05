const mongoose = require('mongoose');

const judgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  court: { type: String, required: true },
  assignedCases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
  // Add more fields as needed
});

const Judge = mongoose.model('Judge', judgeSchema);

module.exports = Judge;
