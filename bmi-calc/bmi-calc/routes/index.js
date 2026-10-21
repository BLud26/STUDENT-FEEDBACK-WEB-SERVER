const express = require('express')
const router = express.Router()
const calculateBMI = require('../model/bmi_calculator')

// Home page: shows the form for height and weight
router.get('/', function(req, res, next) {
    res.render('index')
})

// Reads height and weight from the query string, then shows the BMI or an error
router.get('/calculate', function(req, res, next) {

    // Form data arrives as text
    const heightText = req.query.height
    const weightText = req.query.weight

    // Error 1: one or both values are missing or blank
    if (!heightText || !weightText) {
        return res.status(400).render('bmi_error', {
            errorMessage: 'Please enter both your height and your weight.'
        })
    }

    // Convert the text to numbers. Number('abc') gives NaN.
    const height = Number(heightText)
    const weight = Number(weightText)

    // Error 2: values are not numbers (NaN or Infinity)
    if (!Number.isFinite(height) || !Number.isFinite(weight)) {
        return res.status(400).render('bmi_error', {
            errorMessage: 'Height and weight must be numbers.'
        })
    }

    // Error 3: zero or negative values can't produce a real BMI
    // (a height of 0 would also mean dividing by zero)
    if (height <= 0 || weight <= 0) {
        return res.status(400).render('bmi_error', {
            errorMessage: 'Height and weight must both be greater than zero.'
        })
    }

    // Data is valid: calculate BMI with the model, then format to two decimal places
    const bmi = calculateBMI(height, weight)
    res.render('results', { bmi: bmi.toFixed(2) })

})

module.exports = router
