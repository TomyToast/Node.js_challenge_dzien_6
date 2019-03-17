const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/zadanie01/')));

app.post('/form', (req, res) => {
    const { num1, num2 } = req.body;
    const success = `<h1>${num2} jest dzielnikiem ${num1}</h1>`
    const failure = `<h1>${num2} nie jest dzielnikiem ${num1}</h1>`

    res.send(num1 % num2 !== 0 ? failure : success);
  })

app.listen(3000, () => {
    console.log('Server running on :3000');
});