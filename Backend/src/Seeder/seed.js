const Employee = require("../models/employee.model");
const Department = require("../models/department.model");
const Designation = require("../models/designation.model");
const Role = require("../models/role.model");
const Counter = require("../models/counter.model");

async function seed() {
  try {
    // Clear old data
    await Employee.deleteMany({});
    await Department.deleteMany({});
    await Designation.deleteMany({});
    await Role.deleteMany({});
    await Counter.deleteMany({});

    console.log("Old Data Cleared");

    // Create Department
    const department = await Department.create({
      name: "IT",
      description: "Information Technology Department",
    });

    console.log("Department Created");

    // Create Designation
    const designation = await Designation.create({
      name: "Software Engineer",
      department: department._id,
    });

    console.log("Designation Created");

    // Create Role
    const role = await Role.create({
      name: "Admin",

      permissions: [
        "employee.create",
        "employee.read",
        "employee.update",
        "employee.delete",
      ],
    });

    console.log("Role Created");

    // Create Counter
    await Counter.create({
      name: "employee",
      seq: 1,
    });

    console.log("Counter Created");

    // Create Employee
    const employee = await Employee.create({
      empID: "12345",

      firstName: "Ritik",

      lastName: "Koliyal",

      email: "koliyalritik50@gmail.com",

      fatherName: "ABC",

      dob: new Date("2000-07-15"),

      password: "12345",

      phoneNumber: 9876543210,

      alterNatePhoneNumber: 9876543211,

      address: {
        country: "India",

        state: "Delhi",

        district: "North West Delhi",

        city: "Delhi",

        pinCode: 110081,
      },

      department: department._id,

      designation: designation._id,

      role: role._id,
    });

    console.log("Employee Created");

    // Update createdBy
    department.createdBy = employee._id;
    await department.save();

    designation.createdBy = employee._id;
    await designation.save();

    role.createdBy = employee._id;
    await role.save();

    console.log("Seeder Completed");

    process.exit(0);
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
}

module.exports = seed;
