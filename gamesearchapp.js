const express = require('express')
const morgan = require('morgan')
const app = express();
app.use(morgan('common')) // a format

const games = require('./game-data')

app.get('/games', (req,res) => {
    const { sort, genres } = req.query
    if(sort){
        if(!['Rating', 'App'].includes(sort)) { //query is case sensitive
            return res.status(400).send('Sort must be of only one rating or app')
        }
    }
   
    if(genres) {
        if(!['Action', 'Puzzle','Strategy','Casual','Arcade','Card'].includes(genres)){
            return res.status(400).send('Genre must be of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }
    
    let results = genres 
    ? games.filter(app => 
        app
            .Genres
            .includes(genres))
    : games;




    if (sort) {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
      }

    res.json(results)
})

module.exports = app;