const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const auth=require('../middleware/auth');
const employeeController = require('../controllers/employeeController');
const Management = require('../models/Management');

// GET all employees
router.get("/", auth.isAuth,auth.isAdmin, employeeController.getEmployees);

// GET one employee
router.get('/:id', auth.isAuth, getEmployee, (req, res) => {
  res.json(res.employee);
});

// POST new employee
router.post('/',  async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    salary: req.body.salary,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (update) one employee
router.put('/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.position != null) {
    res.employee.position = req.body.position;
  }
  if (req.body.salary != null) {
    res.employee.salary = req.body.salary;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one employee
router.delete('/:id', getEmployee, auth.isAuth,auth.isAdmin, async (req, res) => {
  try {
    // get the employee id from the request object
    const employeeId = req.params.id;

    // delete the employee from the database
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(400).json({ message: "employee not found" });
    }

    // return a success message
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getEmployee(req, res, next) {
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

// Put attendance for an employee
router.post('/attendance',  async (req, res) => {
  const attendance = new Management({
    action: req.body.action,
    employee: req.body.employee,
    date: req.body.date,
    present: req.body.present,
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/leave',  async (req, res) => {
  const leave = new Management({
    action: req.body.action,
    employee: req.body.employee,
    leaveType: req.body.leaveType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
  });

  try {
    const newLeave = await leave.save();
    res.status(201).json(newLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
