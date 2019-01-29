export class EmployeeModel {
  private username: String;
  private id: Number;
  private domain: String;
  private salary: Number;

  get _username() {
    return this.username;
  }

  get _id() {
    return this.id;
  }

  get _domain() {
    return this.domain;
  }

  get _salary() {
    return this.salary;
  }

  employeeData(name, id, domain, sal) {
    this.username = name;
    this.id = id;
    this.domain = domain;
    this.salary = sal;
  }
}
