import TVshow from "./models/TVShowModel.js";
import { showDetails } from "./view/TVShowView.js";

const search = window.location.search;
const params = new URLSearchParams(search);

const show = new TVshow();
show.id = params.get("id");
show.channel = params.get("ch");
show.genres = params.get("gen");
show.imageURL = params.get("poster");
show.language = params.get("lang");
show.name = params.get("name");
show.running = params.get("run");
show.type = params.get("type");

showDetails(show);
