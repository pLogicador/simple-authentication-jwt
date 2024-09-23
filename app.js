/*
    Copyright © pLogicador - Pedro Miranda
*/

/* imports */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateFields, validationRules } = require('./utils/validation');

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

// Open Rout - Public Route
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcome to our API'})
});

// Close Rout - Private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({msg: 'User not found!'});
    }

    res.status(200).json({user});
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({msg: 'Access denied!'})
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (error) {
        res.status(400).json({msg: 'Invalid token!'});
    }
}

// Register User
app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmpassword} = req.body

    // validations
    const errors = validateFields({ name, email, password });

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "Passwords don't match" });
    }

    // check if user exists
    const userExists = await User.findOne({ email: email});

    if(userExists) {
        return res.status(422).json({ msg: "please, use another email!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
        name, 
        email, 
        password: passwordHash,
    });

    try {
        await user.save();

        res.status(201).json({msg: 'User created successfully!'});

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, please try again!'});
    }
});

// Authentication User - Login
app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body;

    // validations
    const errors = validateFields({ email, password });

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    // check if user exists
    const user = await User.findOne({ email: email});

    if(!user) {
        return res.status(404).json({ msg: 'User not found!' });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Invalid password!' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            }, 
            secret,
        );
        res.status(200).json({msg: 'Authentication completed successfully', token});

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, please try again!'});
    }
});

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Onboarding process - initial setup
mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster01.xqwxin4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`
    )
    .then(() => {
        app.listen(3000);
        console.log("connected to the database!");
    })
    .catch((err) => console.log(err));
