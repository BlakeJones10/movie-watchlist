const container = document.getElementById('watchlist-container');

// Step 1: Load watchlist from localStorage
let watchList = JSON.parse(localStorage.getItem('watchList')) || [];

// Step 2: Function to render the watchlist
function renderWatchList() {
    container.innerHTML = '';

    if (watchList.length === 0) {
        container.innerHTML = '<p>Your watchlist is empty.</p>';
        return;
    }

    watchList.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.dataset.movieData = JSON.stringify(movie);
        
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p>${movie.Type}</p>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        const removeBtn = movieItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const movieData = JSON.parse(movieItem.dataset.movieData);
            watchList = watchList.filter(item => item.Title !== movieData.Title);
            localStorage.setItem('watchList', JSON.stringify(watchList));
            movieItem.remove();
            
            if (watchList.length === 0) {
                container.innerHTML = '<p>Your watchlist is empty.</p>';
            }
        });

        container.appendChild(movieItem);
    });
}

// Initial render
renderWatchList();
