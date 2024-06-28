const express = require('express');
const logger = require('morgan')

const app = express()

app.use(logger('dev'))

app.get('/greetings/:username', (req, res) => {
    res.send(`It's very nice to see you ${req.params.username}`)
})

app.get('/roll/:number', (req, res) => {
    let input = parseInt(req.params.number)
    let roll = Math.floor(Math.random() * input)
    res.send(`You rolled a ${roll}`)
})



app.listen(3000, () => {
    console.log('I am listening')
})