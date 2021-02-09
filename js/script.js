Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchedMovie: '',
		movies: ''
	},

	methods: {
		searchMovie: function () {
			const self = this;

			axios
				.get(`https://api.themoviedb.org/3/search/movie/?api_key=a12efa1af0ae84b6f6e32a9c870485be&language=it-IT&query=${this.searchedMovie}`)
				.then(function (movie) {
					self.movies = movie.data.results;
				});
		}
	}
});
