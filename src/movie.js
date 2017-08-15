import Joi from 'joi'

class Movie {
  constructor(title='', releaseDate='', duration=0, genre='', synopsis='') {
    this.title = title;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.genre = genre;
    this.synopsis = synopsis;
  }

  static publicProps() {
    return ['title', 'releaseDate', 'duration', 'genre', 'synopsis'];
  }

  static publicSchema() {
    const schema = Joi.object().keys({
      title: Joi.string(),
      releaseDate: Joi.date(),
      duration: Joi.number(),
      genre: Joi.string(),
      synopsis: Joi.string()
    });

    return schema;
  }

  toPublicJSON() {
    const json = {};
    const keys = Movie.publicSchema().keys();

    for (let i = 0; i < keys.length; i++) {
      json[keys[i]] = this[keys[i]];
    }
    return json;
  }
}

export default Movie;
