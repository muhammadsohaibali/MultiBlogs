const users = require('../../src/users_db.json');

export default function handler(req, res) {
    res.status(200).json(users);
}
