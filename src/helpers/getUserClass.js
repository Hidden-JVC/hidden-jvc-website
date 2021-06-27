export default function getUserClass(user) {
    if (user === null) {
        return 'anonymous-user';
    } else if (user.IsAdmin) {
        return 'admin-user';
    } else if (user.IsModerator) {
        return 'moderator-user';
    } else {
        return 'registered-user';
    }
}
