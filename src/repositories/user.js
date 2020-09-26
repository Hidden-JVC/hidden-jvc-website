import Repository from './Repository.js';

class UserRepository extends Repository {
    async login(name, password) {
        return await this.post('users/login', { name, password });
    }

    async register(name, password) {
        return await this.post('users/register', { name, password });
    }
}

export default new UserRepository();
