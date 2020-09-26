import Repository from './Repository.js';

class ForumRepository extends Repository {
    async getTopics(forumId, page = 1) {
        return await this.get('hidden/topics', { forumId, page });
    }

    async getForum(forumId) {
        return await this.get(`jvc/forums/${forumId}`);
    }

    async createTopic(forumId, title, content, username) {
        return await this.post('hidden/topics', { forumId, title, content, username });
    }
}

export default new ForumRepository();
