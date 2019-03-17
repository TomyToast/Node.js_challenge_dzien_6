const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('./public/zadanie02'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

let myName = '';

app.post('/form', (req, res) => {
    const { name } = req.body;
    myName = name;
    res.send(`<h1>imie to ${myName}</h1> </br> <a href='/'>Back</a>`);
})

app.get('/cookie/set', (req, res) => {
    res.cookie('formName', myName, {
        maxAge : 2628000000,
    });
    res.send('Ciastko ustawione!');
});

app.get('/cookie/show', (req, res) => {
    const myCookie = req.cookies.formName;
    res.send(`Ciastko ma wartość ${ myCookie }`);
});

app.get('/cookie/check', (req, res) => {
    if (myName === undefined){
        res.send(`Imie nie zostalo dodane do ciastka`)
    } else {
        res.send(`Imie jest w ciastku`)
    };
})


app.listen(3000, () => {
    console.log('server on port 3000');
});