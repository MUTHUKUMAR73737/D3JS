export class User {
  private username: String;
  private password: String;
  private email: String;
  private phone: Number;
  private role: String;

  get _username(): String {
    return this.username;
  }

  set _userName(newUsername: String) {
    this.username = newUsername;
  }

  get _password(): String {
    return this.password;
  }

  set _password(newPassword: String) {
    this.password = newPassword;
  }

  get _email(): String {
    return this.email;
  }

  set _email(newEmail) {
    this.email = newEmail;
  }

  get _phone() {
    return this.phone;
  }

  set _phone(newPhone) {
    this.phone = newPhone;
  }

  get _role() {
    return this.role;
  }

  set _role(newRole) {
    this.role = newRole;
  }
}
