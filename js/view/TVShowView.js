import { search } from "../controllers/TVShowController.js";

const $ = document.getElementById.bind(document);

const printCard = (show) => {
  const { id, name, language, genres, type, channel, imageURL, largeImageURL } =
    show;
  const isRunning = show.running ? "Sim" : "Não";
  const url = `/details.html?id=${id}&name=${name}&lang=${language}&gen=${genres}&type=${type}&run=${isRunning}&ch=${channel}&poster=${largeImageURL}`;

  const showCard = `
        <div class="show-card">
            <a href="${url}">
                <img src="${imageURL}" alt="${name}">
            </a>
            <a href="${url}">
                <p>${name}</p>
            </a>
        </div> 
    `;
  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};

export const searchShows = async () => {
  const query = $("query").value.trim();
  if (query) {
    const notFoundMessage = $("not-found-message");
    notFoundMessage.style.display = "none";
    const showsArea = $("shows-area");
    const loadingAnimation = `<img src="/img/loading.gif" alt="Procurando">`;
    showsArea.innerHTML = loadingAnimation;
    const shows = await search(query);
    showsArea.innerHTML = "";

    if (!(shows.length > 0)) {
      notFoundMessage.style.display = "block";
      return;
    }
    const showsJSON = JSON.stringify(shows);
    localStorage.setItem("shows", showsJSON); //salva no local storage
    shows.forEach((s) => printCard(s));
  }
};

export const showDetails = (show) => {
  $("poster").src = show.imageURL;
  $("poster").alt = show.name;
  $("name").innerHTML = show.name;
  $("type").innerHTML = show.type;
  $("language").innerHTML = show.language;
  $("genres").innerHTML = show.genres;
  $("running").innerHTML = show.running;
  $("channel").innerHTML = show.channel;
};

export const loadShows = () => {
  const showsJSON = localStorage.getItem("shows");
  if (showsJSON) {
    const shows = JSON.parse(showsJSON);
    shows.forEach((s) => printCard(s)); //caso exista shows salvos no local storage printe cada um deles na tela
  }
};
