import { IEmployee } from "./model";
import { Employee } from "./schema";

export class EmployeeService {
  public async createEmployee(employeeParams: IEmployee) {
    const newEmployee = new Employee(employeeParams);
    const employee = await newEmployee.save();
    return employee;
  }

  public async fetchEmployees() {
    const employees = await Employee.find();
    return employees;
  }

  public async findEmployee(query) {
    const employee = await Employee.findOne(query);
    return employee;
  }

  public async updateEmployee(employeeParams: IEmployee) {
    const query = { _id: employeeParams._id };

    const employee = await Employee.findOneAndUpdate(query, employeeParams, {
      new: true,
      runValidators: true,
    });

    return employee;
  }

  public async deleteEmployee(_id: string) {
    const query = { _id: _id };

    const employee = await Employee.deleteOne(query);

    return employee;
  }
}
