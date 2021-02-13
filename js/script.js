Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchedMedia: '',
		media: [],
		actors: ''
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

		findCast (mediaId) {
			return axios
				.get(`https://api.themoviedb.org/3/movie/${mediaId}/credits?api_key=a12efa1af0ae84b6f6e32a9c870485be&language=it-IT`)
				.then((castInfo) => {
					const actorsList = [];

					this.actors = '';

					for (var i = 0; i < 5; i++) {
						const castMember = castInfo.data.cast[i];

						if (castMember) {
							actorsList.push(castMember.name);
						}
					}

					actorsList.forEach((actor, index) => {
						if (index !== (actorsList.length - 1)) {
							this.actors += `${actor}, `;
						} else {
							this.actors += actor;
						}
					});
				})
				.catch(error => { // Nel caso di 404, non mostrare nessun cast
					if (error.response) {
						this.actors = '';
					}
				});
		},

		setPoster (path) {
			if (path) {
				return `url(https://image.tmdb.org/t/p/w500/${path})`;
			} else {
				return 'url(https://www.altavod.com/assets/images/poster-placeholder.png)';
			}
		}
	}
});
