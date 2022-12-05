const wrapper = document.getElementById('wrapper');

const favMovie = JSON.parse(localStorage.getItem('favMoviesArray'));

function addMovieToFavouritePage() {
    
    for (let i = 0; i < favMovie.length; i++) {
        let poster = favMovie[i].poster;
        let movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `<img class="poster" src=${poster}>`;
        wrapper.appendChild(movieCard);
    }

}

addMovieToFavouritePage();