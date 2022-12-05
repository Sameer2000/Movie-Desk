// Title : http://www.omdbapi.com/?apikey=f9d55ac1&t=avatar
// Search-result : https://www.omdbapi.com/?apikey=f9d55ac1&s=avatar&page=1

const searchBox = document.getElementById('search-box');
const searchList = document.getElementById('search-list');
const result = document.getElementById('result');
const addToFavourites = document.querySelector('#add-to-fav');

// Function to find movies
function findMovies() {
    let title = (searchBox.value).trim();
    if (title.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(title);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

// Function to get movies from OMDB API
async function loadMovies(title) {
    const URL = `https://www.omdbapi.com/?apikey=f9d55ac1&s=${title}&page=1`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);
}

// Function to display movie in search list
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let listItem = document.createElement('div');
        listItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        listItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "assets/image_not_found.png";

        listItem.innerHTML = `
        <div class = "thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(listItem);
    }
    loadMovieDetails();
}

// Function to get movie details from OMDB API
function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=f9d55ac1`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

// Function to display movie info
function displayMovieDetails(details) {
    result.innerHTML = `
    <div class = "poster">
        <img class="movie-poster" src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year"><b>Year:</b> ${details.Year}</li>
            <li class = "rating"><b>Ratings: ${details.Rated}</b></li>
            <li class = "released"><b>Released:</b> ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "director"><b>Director:</b> ${details.Director}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i style="color: gold;" class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

const favMovieInLocal = [];

addToFavourites.addEventListener('click', function(){
    console.log('Added');
    let i = 0;
    const favMovieTitle = document.querySelector('.movie-title').innerText;
    const favMoviePoster = document.querySelector('.movie-poster').src; 
    const favMovie = {
        title: favMovieTitle,
        poster: favMoviePoster
    }
    favMovieInLocal.push(favMovie);
    localStorage.setItem('favMoviesArray', JSON.stringify(favMovieInLocal));
});


// event listener which gets activated on clicking search box
window.addEventListener('click', (event) => {
    if (event.target.className != "searchBox") {
        searchList.classList.add('hide-search-list');
    }
});