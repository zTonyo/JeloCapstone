exports.maskEmail = (email) => {
    const [username, domain] = email.split("@");

    if (username.length <= 2) {
        return `${username[0]}*${"@"+domain}`;
    }

    return `${username[0]}${"*".repeat(username.length - 2)}${username[username.length - 1]}@${domain}`;
};