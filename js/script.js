Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchedEntity: '',
		movies: '',
		tvSeries: ''
	},

	methods: {
		searchEntity: function () {
			const self = this;

			axios
				.get(`https://api.themoviedb.org/3/search/movie/?api_key=a12efa1af0ae84b6f6e32a9c870485be&language=it-IT&query=${this.searchedEntity}`)
				.then(function (movie) {
					self.movies = movie.data.results;
				});

			axios
				.get(`https://api.themoviedb.org/3/search/tv?api_key=a12efa1af0ae84b6f6e32a9c870485be&language=it_IT&query=${this.searchedEntity}`)
				.then(function (series) {
					self.tvSeries = series.data.results;
				});
		}
	}
});
