Vue.config.devtools = true;

new Vue ({
	el: '#boolflix',

	data: {
		searchStarted: false,
		searchedMedia: '',
		media: [],
		totalGenres: [],
		actors: '',
		genres: '',
		pickedGenre: 'All',
	},

	mounted () {
		this.getGenres('movie');
		this.getGenres('tv');
	},

	methods: {
		searchMedia () {
			if (this.searchedMedia.trim().length !== 0) {
				this.searchStarted = true;
				this.media = [];
				this.searchCategory('https://api.themoviedb.org/3/search/movie');
				this.searchCategory('https://api.themoviedb.org/3/search/tv');
			}
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

		findGenre (genreIds) {
			this.genres = '';

			genreIds.forEach((id, index) => {
				this.totalGenres.forEach((genre) => {
					if (id === genre.id) {
						if (index !== (genreIds.length - 1)) {
							this.genres += `${genre.name}, `;
						} else {
							this.genres += genre.name;
						}
					}
				});
			});
		},

		filterByGenre (genreIds, string) {
			const genreNames = [];

			genreIds.forEach((id) => {
				this.totalGenres.forEach((genre) => {
					if (id === genre.id) {
						genreNames.push(genre.name);
					}
				});
			});

			if (genreNames.includes(string)) {
				return true;
			} else {
				return false;
			}
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
