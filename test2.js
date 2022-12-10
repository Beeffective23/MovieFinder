const apiKey = "0b5fcdd34185ea1574bef31858f90595";
const baseUrl = "https://api.themoviedb.org/3";
let favouriteMovie = [];
let title = document.querySelector("title");
let movieRandomNum = [];
const likeBtn = document.querySelector(".likeBtn");
const dislikeBtn = document.querySelector(".dislikeBtn");
const showRecommended = document.querySelector(".btn");

const getGenres = async () => {
  const getMovieList = "/genre/movie/list";
  const query = `?api_key=${apiKey}`;
  const queryToFetch = baseUrl + getMovieList + query;
  let genres = [];
  try {
    const response = await fetch(queryToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const insertingGenresToList = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

const getMovies = async () => {
  const getMovie = `/discover/movie`;
  const selectedGenre = getSelectedGenre();
  const query = `?api_key=${apiKey}&with_genres=${selectedGenre}`;
  const urlToFetch = baseUrl + getMovie + query;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const results = jsonResponse.results;
      return results;
    }
  } catch (error) {
    console.log(error);
  }
};

const getRandomPoster = (movies) => {
  let posterAndTitle = [];
  const baseUrlPoster = "https://image.tmdb.org/t/p/original";
  const random = Math.floor(Math.random() * movies.length);
  movieRandomNum = random;
  Trailer(movies[random].id);
  const posterFromArray = movies[random].backdrop_path;
  const movieTitle = movies[random].title;
  const movieOverview = movies[random].overview;
  const posterLink = baseUrlPoster + posterFromArray;
  posterAndTitle.push(posterLink);
  posterAndTitle.push(movieTitle);
  posterAndTitle.push(movieOverview);
  return posterAndTitle;
};

const displayPosterAndTitle = (link, title, overView) => {
  title = title.toUpperCase();
  var img = document.createElement("img");
  img.id = `imgPoster`;
  img.src = link;
  var src = document.getElementById("posterImg");
  src.appendChild(img);

  let h = document.createElement("h2");
  h.textContent = title;
  let element = document.getElementById("movieTitle");
  element.appendChild(h);

  let p = document.createElement("p");
  p.textContent = overView;
  let element1 = document.getElementById("movieOverview");
  element1.appendChild(p);
};

const getSelectedGenre = () => {
  const genre = document.getElementById(`genres`).value;
  return genre;
};

const clearCurrentMovie = () => {
  const moviePoster = document.getElementById("posterImg");
  const movieOverview = document.getElementById("movieOverview");
  const movieTitle = document.getElementById("movieTitle");
  moviePoster.innerHTML = "";
  movieTitle.innerHTML = "";
  movieOverview.innerHTML = "";
};
if (title.textContent === "Document") {
  showRecommended.addEventListener("click", async function () {
    clearCurrentMovie();
    const movies = await getMovies(); // get movies from API
    const poster = getRandomPoster(movies); // based on the loaded 20 movies, load a random movie. poster[0] is the link and poster[1] is the title
    displayPosterAndTitle(poster[0], poster[1], poster[2]); // insert img html to display it in browser
    let likeBtn = document.getElementById("likeButton");
    let dislikeBtn = document.getElementById("dislikeButton");
    likeBtn.style.opacity = 1;
    likeBtn.style.cursor = "pointer";
    dislikeBtn.style.opacity = 1;
    dislikeBtn.style.cursor = "pointer";
  });

  likeBtn.addEventListener("click", async function () {
    clearCurrentMovie();
    const movies = await getMovies(); // get movies from API
    const poster = getRandomPoster(movies); // based on the loaded 20 movies, load a random movie. poster[0] is the link and poster[1] is the title
    displayPosterAndTitle(poster[0], poster[1], poster[2]);
    favouriteMovie.push(movies[movieRandomNum].title);
    console.log(favouriteMovie);
  });

  dislikeBtn.addEventListener("click", async function () {
    clearCurrentMovie();
    const movies = await getMovies(); // get movies from API
    const poster = getRandomPoster(movies); // based on the loaded 20 movies, load a random movie. poster[0] is the link and poster[1] is the title
    displayPosterAndTitle(poster[0], poster[1], poster[2]);
  });

  const genres = await getGenres(); // getGenres
  insertingGenresToList(genres); // insert genres to list
}
const Trailer = async (movieId) => {
  const getTrailer = `/movie/${movieId}/videos`;
  const query = `?api_key=${apiKey}`;
  const urlToFetch = baseUrl + getTrailer + query;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const results = jsonResponse.results;
      let youtube = document.querySelector(".youtube");
      youtube.href += results[0].key;
    }
  } catch (error) {
    console.log(error);
  }
  let trailer = document.getElementById(`trailer`);
  trailer.style.opacity = 1;
};

export { favouriteMovie };
