const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
    async findByName(name) {
        const objects = await this.load();
        return objects.find(o => o.name == name);
    }

}

module.exports = new UserService(User);
