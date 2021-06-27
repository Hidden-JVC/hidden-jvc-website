import Repository from './Repository.js';

class UserRepository extends Repository {
    async login(name, password) {
        return await this.post('users/login', { name, password });
    }

    async register(name, password) {
        return await this.post('users/register', { name, password });
    }

    async getUsers(query) {
        return await this.get('users', query);
    }

    async me() {
        return await this.get('users/me');
    }

    async getUser(userId) {
        return await this.get(`users/${userId}`);
    }

    async updateUser(userId, body) {
        return await this.post(`users/${userId}`, body);
    }
}

export default new UserRepository();
