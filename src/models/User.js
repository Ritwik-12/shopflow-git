// User model - handles DB interactions
class UserModel {
  static async findOne({ email }) {
    return { id: 1, email, password: 'hashed_pw', name: 'Test User' };
  }
  static async create({ email, password, name }) {
    return { id: Date.now(), email, password, name };
  }
}
module.exports = UserModel;
