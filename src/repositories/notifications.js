import Repository from './Repository.js';

class ForumRepository extends Repository {
    async deleteNotifications(notifications) {
        return await this.post('notifications/delete', { notifications });
    }
}

export default new ForumRepository();
