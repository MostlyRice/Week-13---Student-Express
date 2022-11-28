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

// edit a student
router.patch('/students/:id', function(req, res, next){
    // if request is to /students/100
    // studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID } } )
        .then( (rowsModified) => {

            let numberOfRowsModified = rowsModified[0] // number of rows changed

            if (numberOfRowsModified == 1) { // exactly one row
                return res.send('ok')
            }
            // no rows -- student not found - return 404
            else {
                return res.status(404).json(['Student with that id not found'])
            }
        }).catch( err => {
            // if validation error, that's a bad request - e.g. modify student to have no name
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map( e => e.message) 
                return res.status(400).json(messages)
            } else {
                // unexpected error
                return next(err)
            }
        })
            // Or modification that violates a constraint?
            //    -- for ex., modifying a student to have no name
})


// delete student
router.delete('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    Student.destroy( { where: { id: studentID } } )
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json(['Not found'])
            }
            // return res.send('deleted!')
        }).catch ( err => next(err) ) // unexpected errors
})

module.exports = router

// don't write code here - it will be ignored