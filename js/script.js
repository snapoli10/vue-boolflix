Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchedMedia: '',
		media: [],
		actors: '',
		totalGenres: [],
		genres: ''
	},

	mounted () {
		this.getGenres('movie');
		this.getGenres('tv');
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
	 		axios
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

		getGenres (category) {
			axios
				.get(`https://api.themoviedb.org/3/genre/${category}/list?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`)
				.then((genre) => {
					genre.data.genres.forEach((newGenre) => {
						let alreadySaved = false;

						this.totalGenres.forEach((savedGenre) => {
							if (savedGenre.id === newGenre.id) {
								alreadySaved = true;
							}
						});

						if (!alreadySaved) {
							this.totalGenres.push(newGenre);
						}
					});
				});
		},

		findGenre (genreId) {
			const sameGenre = [];

			this.genres = '';

			genreId.forEach((genre) => {
				this.totalGenres.forEach((g) => {
					if (genre === g.id) {
						sameGenre.push(g.name);
					}
				});
			});

			sameGenre.forEach((element, index) => {
				if (index !== (sameGenre.length - 1)) {
					this.genres += `${element}, `;
				} else {
					this.genres += element;
				}
			});
		},

		setPoster (path) {
			if (path) {
				return `url(https://image.tmdb.org/t/p/w342/${path})`;
			} else {
				return 'url(https://www.altavod.com/assets/images/poster-placeholder.png)';
			}
		}
	}
});
