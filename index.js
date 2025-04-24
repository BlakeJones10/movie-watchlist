const searchBtn = document.getElementById('search-btn');
const watchBtns = document.querySelectorAll('.watch-btn');
const movieList = document.getElementById('movie-list');

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;


    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7eb750ad&s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const movies = data.Search;
            movieList.innerHTML = '';

            movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add("movie-item");
                movieItem.dataset.movieData = JSON.stringify(movie);
                movieItem.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <div class="movie-info">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                        <p>${movie.Type}</p>
                        <button class="watch-btn">WatchList</button>
                    </div>
                `;
                movieList.appendChild(movieItem);
            })
        });
});

function addToWatchlist(movie) {
    const watchList = JSON.parse(localStorage.getItem('watchList')) || [];

    if (!watchList.some(item => item.Title === movie.Title)) {
        watchList.push(movie);
        localStorage.setItem('watchList', JSON.stringify(watchList));
    }

};


movieList.addEventListener('click', function(e) {
    if (e.target.classList.contains('watch-btn')) {
        const movieItem = e.target.closest('.movie-item');
        const movieData = JSON.parse(movieItem.dataset.movieData);
        addToWatchlist(movieData);

        e.target.textContent = 'Added to WatchList';
        e.target.disabled = true;
        e.target.classList.add('added');
    }
});
