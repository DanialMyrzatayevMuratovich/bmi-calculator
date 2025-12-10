const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// main-web-page form
app.get('/', (req, res) => {
  res.send(`
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

    <div class="form-container">
      <h1>BMI Calculator</h1>
      <form action="/calculate-bmi" method="POST">
        <label for="weight">Weight (kg): </label>
        <input type="number" id="weight" name="weight" required>
        <br>
        <label for="height">Height (m): </label>
        <input type="number" id="height" name="height" step="0.01" required>
        <br>
        <button type="submit">Calculate BMI</button>
      </form>
    </div>

    
  `);
});


app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  

  if (weight <= 0 || height <= 0) {
    return res.send('Please enter correct values for weight and height.');
  }

  const bmi = weight / (height * height);
  let category = '';
  let categoryClass = '';

  // BMI category check
  if (bmi < 18.5) {
    category = 'Underweight';
    categoryClass = 'underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
    categoryClass = 'normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    categoryClass = 'overweight';
  } else {
    category = 'Obesity';
    categoryClass = 'obese';
  }

  // send result
  res.send(`
    <head>
      <link rel="stylesheet" type="text/css" href="/style.css">
    </head>
    <div class="result-container">
      <h1>Your BMI: ${bmi.toFixed(2)}</h1>
      <p class="category ${categoryClass}">Category: ${category}</p>
      <a href="/">Return</a>
    </div>
  `);
});

// start server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
