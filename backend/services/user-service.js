const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
    async findByName(name) {
        const objects = await this.load();
        return objects.find(o => o.name == name);
    }
    async getUserByEmail(email) {
        return await User.findOne({ email: email }).exec();
    }
    
    async getUserById(id) {
        return await User.findById(id).exec();
    }


}

module.exports = new UserService(User);
