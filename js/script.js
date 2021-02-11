Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchedMedia: '',
		media: []
	},

	methods: {
		searchMedia () {
			this.media = [];
			this.searchCategory('https://api.themoviedb.org/3/search/movie');
			this.searchCategory('https://api.themoviedb.org/3/search/tv');
		},

		searchCategory (apiUrl)	{
			axios
				.get(`${apiUrl}?api_key=a12efa1af0ae84b6f6e32a9c870485be&language=it-IT&query=${this.searchedMedia}`)
				.then((element) => {
					this.media = [...this.media,...element.data.results];
				});
		},

		setPoster (path) {
			if (path !== null) {
				return `url(https://image.tmdb.org/t/p/w500/${path})`;
			} else {
				return 'url(https://www.killthebeat.it/wp-content/uploads/2020/01/bianco-punto-interrogativo-su-uno-sfondo-circolare-nero_318-35996.jpg)';
			}
		}
	}
});
