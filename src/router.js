const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};
const secret = "mysecretkey";

router.post('/login', (req, res) => {
    const { username, password } = req.body
    if(mockUser.username == username && mockUser.password == password) {
        const token = jwt.sign(
            { username: mockUser.username },
            secret
        );
        
        console.log("LOGIN TOKEN:", token)
        res.json({ data: token })
    } else {
        console.log("ERROR: username or password was incorrect")
        res.end();
    }
    

});

const verifyToken = token => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded

    } catch (err) {
        console.log("ERROR:", err)
        return false
    }
}

router.get('/profile=:token', (req, res) => {
    const { token } = req.params
    if (verifyToken(token)) { console.log("signed in as:", mockUser) }  
});

module.exports = router;
