//Selects HTML and URL elements.
const cards = document.getElementById("dynamic-cards");
const templateCard = document.getElementById("template-card").content;
const loading = document.getElementById("spinner-load");
const api = "https://rickandmortyapi.com/api/character";

//DOMContentLoaded makes sure the DOM loaded first.
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);

    const res = await fetch(api);
    const data = await res.json();

    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    loadingData(false);
  }
};

//Function painting spinner loading.
const loadingData = (state) => {
  state ? loading.classList.remove("d-none") : loading.classList.add("d-none");
};
