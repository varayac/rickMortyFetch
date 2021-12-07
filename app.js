//Selects HTML and URL elements.
const cards = document.getElementById("dynamic-cards");
const templateCard = document.getElementById("template-card").content;
const loading = document.getElementById("spinner-load");
const api = "https://rickandmortyapi.com/api/character";
const fragment = new DocumentFragment();

//DOMContentLoaded makes sure the DOM loaded first.
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);

    const res = await fetch(api);
    const data = await res.json();

    printCard(data);
  } catch (e) {
    console.log(e);
  } finally {
    loadingData(false);
  }
};

//Function paint Data Fetch results.
const printCard = (data) => {
  data.results.forEach((item) => {
    console.log(item);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("img").setAttribute("src", item.image);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("p.text-secundary").textContent = item.species;
    clone.querySelector("p.text-success").textContent = item.gender;
    fragment.append(clone);
  });
  cards.append(fragment);
};

//Function painting spinner loading.
const loadingData = (state) => {
  state ? loading.classList.remove("d-none") : loading.classList.add("d-none");
};
