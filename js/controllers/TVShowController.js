import TVShow from "../models/TVShowModel.js";

const API_URL = "https://api.tvmaze.com/search/shows?";

export const search = async (term) => {
  const response = await fetch(API_URL + new URLSearchParams({ q: term }));
  const results = await response.json();
  const TVShows = [];
  results.forEach((r) => {
    const { show } = r;
    const {
      id,
      name,
      type,
      language,
      genres,
      status,
      image,
      network,
      webChannel,
    } = show;
    const tvShow = new TVShow();
    tvShow.id = id;
    tvShow.name = name;
    tvShow.type = type;
    tvShow.language = language;
    tvShow.genres = genres.join(", ");
    tvShow.running = status === "Running";
    tvShow.imageURL = image ? image.medium : "/img/noimage.png";
    tvShow.largeImageURL = image ? image.original : "/img/noimage.png";
    tvShow.channel = network ? network.name : webChannel.name;

    TVShows.push(tvShow);
  });

  return TVShows;
};
