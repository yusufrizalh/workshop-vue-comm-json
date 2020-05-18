const key = "2fb7569a";
const defaultTitle = "joker";
const url = `https://www.omdbapi.com/?apikey=${key}&t=`;

Vue.component("movie-data", {
  props: ["movie", "error"],
  template: "#tpl-movie-data",

  data: function () {
    return {
      showImg: false,
    };
  },

  methods: {
    imgLoaded: function () {
      this.showImg = true;
    },
  },
});

var app = new Vue({
  el: "#app",

  data: {
    movie: {},
    loading: true,
    error: false,
  },

  methods: {
    findMovie: function (title) {
      this.error = false;
      this.loading = true;

      fetch(url + title)
        .then((res) => res.json())
        .then((data) => {
          this.movie = data;
          if (this.movie.Actors) this.movie.Actors = data.Actors.split(", ");
          if (this.movie.Error) this.error = true;
          this.loading = false;
        })
        .catch((err) => {
          this.error = true;
          this.loading = false;
        });
    },

    searchHandler: function (e) {
      if (e.target.value) {
        this.findMovie(e.target.value);
        e.target.blur();
      }
    },
  },

  mounted() {
    this.findMovie(defaultTitle);
  },
});
