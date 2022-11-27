let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    // use 'order' to sort students
    // change sort to use first present status then starID
    Student.findAll( {order: [
        'present', 
        'starID'
    ]}).then( students => {
        return res.json(students)
    }).catch( err => next(err) )
})

router.post('/students', function(req, res, next){
    Student.create( req.body ).then( (data) => {
        // every response a server sends has a status code (ex: 404)
        // 200 level codes usually mean success, 500 level mean server problems
        return res.status(201).send('ok')
    }).catch( err => {
        // handle user errors, ex. missing starID or name
        if ( err instanceof db.Sequelize.ValidationError ) {
            // respond with 400 Bad Request error code, include error messages
            let messages = err.errors.map ( e => e.message )
            return res.status(400).json(messages)
        }
        // otherwise, something unexpected has gone wrong (likely a server error-- code level 500)
        return next(err)
    })
})

module.exports = router

// don't write code here - it will be ignored