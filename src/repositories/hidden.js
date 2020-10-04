import Repository from './Repository.js';

class ForumRepository extends Repository {
    async getForum(forumId) {
        return await this.get(`jvc/forums/${forumId}`);
    }

    async getTopics(forumId, page = 1) {
        return await this.get('hidden/topics', { forumId, page });
    }

    async getTopic(topicId, page = 1, userId = null) {
        const query = {
            page
        };
        if (userId !== null) {
            query.userId = userId;
        }
        return await this.get(`hidden/topics/${topicId}`, query);
    }

    async createTopic(forumId, title, content, username) {
        return await this.post('hidden/topics', { forumId, title, content, username });
    }

    async moderation(action, ids) {
        return await this.post('hidden/moderation/topics', { action, ids });
    }
}

export default new ForumRepository();
