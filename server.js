import express from 'express';
import httpStatus from 'http-status';
import cors from 'cors';
import { json as jsonBodyParser } from 'body-parser';
import Movie from './src/movie';
import Joi from 'joi'

const app = express();
const movie = new Movie();

app.use(cors());
app.use(jsonBodyParser());

app.get('/', function (req, res) {
  res.json(movie);
});

app.post('/', function (req, res) {
  const validation = Joi.validate(req.body, Movie.publicSchema());

  if (validation.error){
    res.sendStatus(httpStatus.BAD_REQUEST);
  } else {
    for (let prop in validation.value){
      movie[prop] = validation.value[prop];
    }
    res.sendStatus(httpStatus.OK);
  }
});

app.listen(3001, function () {
  console.log('Listening on port 3001!');
});
