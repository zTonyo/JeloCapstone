const users = [];

const findUserByEmail = (email) => users.find(user => user.email === email);

const addUser = (user) => {
    users.push(user);
    return user;
};

const confirmUser = (email) => {
    const user = findUserByEmail(email);
    if (user) {
        user.confirmed = true;
        return user;
    }
    return null;
};

module.exports = { findUserByEmail, addUser, confirmUser };