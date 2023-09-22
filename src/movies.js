// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
  return moviesArray.map((item) => item.director);
}

function getMoviesByGenre(movies, genre) {
  return movies.filter((item) => item.genre.includes(genre));
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const directorName = 'Steven Spielberg';
  const genre = 'Drama';

  const spielbergMovies = moviesArray.filter(
    (item) => item.director === directorName
  );
  const dramasBySpielberg = getMoviesByGenre(spielbergMovies, genre);

  return dramasBySpielberg.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) {
    return 0;
  }
  const sumOfScores = moviesArray.reduce((acc, val) => {
    return 'score' in val ? acc + Number(val.score) : acc + 0;
  }, 0);

  const amountOfMovies = moviesArray.length;
  const result = +(sumOfScores / amountOfMovies).toFixed(2);

  return result;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const genre = 'Drama';

  const dramaMovies = getMoviesByGenre(moviesArray, genre);
  const result = scoresAverage(dramaMovies);

  return result;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesArraySortedByYear = moviesArray.slice().sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    }
    return a.year - b.year;
  });

  return moviesArraySortedByYear;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesArraySortedByTitles = moviesArray
    .slice()
    .sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );

  const moviesTitles = moviesArraySortedByTitles.map((item) => item.title);

  return moviesTitles.slice(0, 20);
}

const durationToMinutes = (time) => {
  // '2h 22min'
  if (time.endsWith('min')) {
    const [hour, min] = time.split(' ');
    const cleanHour = Number(hour.slice(0, -1));
    const cleanMin = Number(min.slice(0, -3));

    return cleanHour * 60 + cleanMin;
  }

  return Number(time.slice(0, -1)) * 60;
};

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const copiedArray = structuredClone(moviesArray);

  copiedArray.forEach((item) => {
    item.duration = durationToMinutes(item.duration);
  });

  return copiedArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }

  if (moviesArray.length === 1) {
    return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;
  }

  const moviesDictionary = {};

  for (const movie of moviesArray) {
    const key = movie.year.toString();
    if (key in moviesDictionary) {
      moviesDictionary[key].push(movie);
    } else {
      moviesDictionary[key] = [movie];
    }
  }

  for (let key in moviesDictionary) {
    moviesDictionary[key] = scoresAverage(moviesDictionary[key]);
  }

  const arrOfAvg = Object.entries(moviesDictionary).sort((a, b) => {
    return Number(a[0]) - Number(b[0]);
  });

  let maxScore = 0;
  let movieYear = '';

  arrOfAvg.forEach((item) => {
    if (Number(item[1]) > maxScore) {
      maxScore = item[1];
      movieYear = item[0];
    }
  });

  return `The best year was ${movieYear} with an average score of ${maxScore}`;
}
