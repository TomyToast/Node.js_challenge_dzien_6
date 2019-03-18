const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('./public/zadanieDnia'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.post('/save', (req, res) => {
    const { comment } = req.body;
    const arr = [];

    arr.push(comment);

    res.cookie('comments', arr, {
        maxAge : 99999999,
    });
    res.send(`Ciastko ustawione ${arr} </br> <a href='/'>Back</a>`)
})

app.get('/', (req, res) => {
    const myCookie = req.cookies.comment;
    const allComments = myCookie.map( element => {
        `<li>${element}</li>`
    })
    res.send(`<ul>${allComments}</ul>`);
})

app.listen(3000, () => {
    console.log('port 3000 ON');
})

// Funkcje pomocnicze

/**
 * Ta funkcja pobiera string dotychczasowego ciastka, dodaje nowy komentarz i zwraca nowy string - taki z jakim należy nadpisać to ciasto.
 * @param {string} commentsCookieValue Wartość dotychczasowego ciastka przechowującego komentarze
 * @param {string} newComment Nowy komentarz
 * @return {string} Nowy string z komentarzami do zapisania w ciastku
 */
addComment = (commentsCookieValue, newComment) => {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}

/**
 * Ta funkcja odczytuje już dodane komentarze i zwraca je w postaci tablicy.
 * @param {string} commentsCookieValue Wartość dotychczasowego ciastka przechowującego komentarze
 * @return {Array} Tablica z komentarzami
 */
readComments = (commentsCookieValue) => {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}