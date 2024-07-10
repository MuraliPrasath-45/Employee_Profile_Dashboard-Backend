const Employee=require("../models/employee")

const employeeController = {

    getEmployees: async (req, res) => {
        try {
          const employees = await Employee.find().select("-passwordHash -__v");
          res.json(employees);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },
};

module.exports = employeeController;