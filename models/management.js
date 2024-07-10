const mongoose = require("mongoose");

const managementSchema = new mongoose.Schema({
  action: String,
  employee: String,
  date: Date,
  present: {
    type: String,
    default: "present",
  },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
});

module.exports = mongoose.model("Management", managementSchema, "managements");
