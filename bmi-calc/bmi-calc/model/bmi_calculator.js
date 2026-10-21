// Calculates Body Mass Index from height in meters and weight in kilograms.
// The /calculate route checks that both values are numbers above zero
// before calling this function, so there is no divide-by-zero here.
function calculateBMI(height, weight) {
    const bmi = weight / (height * height)
    return bmi
}

module.exports = calculateBMI
