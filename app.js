//Selects HTML and URL elements.
const cards = document.getElementById("dynamic-cards");
const templateCard = document.getElementById("template-cards").content;
const loading = document.getElementById("spinner-load");
const pages = document.getElementById("nav-pages");
const templatePages = document.getElementById("template-pages").content;
//const url = "https://rickandmortyapi.com/api/character";
const fragment = new DocumentFragment();

//DOMContentLoaded makes sure the DOM loaded first.
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async (url = "https://rickandmortyapi.com/api/character") => {
  try {
    loadingData(true);

    const res = await fetch(url);
    const data = await res.json();

    paintCard(data);
  } catch (e) {
    console.log(e);
  } finally {
    loadingData(false);
  }
};

//Function paint pages buttons
const paintPages = (data) => {
  //console.log(data);
  pages.textContent = "";
  const clone = templatePages.cloneNode(true);

  data.prev
    ? (clone.querySelector(".btn-outline-secondary").disabled = false)
    : (clone.querySelector(".btn-outline-secondary").disabled = true);

  data.next
    ? (clone.querySelector(".btn-outline-primary").disabled = false)
    : (clone.querySelector(".btn-outline-primary").disabled = true);

  /* pages.addEventListener("click", (e) => {
    if (e.target.matches(".btn-outline-primary")) {
      if (data.next) return fetchData(data.next);
    }

    if (e.target.matches(".btn-outline-secondary")) {
      if (data.prev) return fetchData(data.prev);
    }
  }); */

  pages.append(clone);
};

//Function paint Data Fetch results.
const paintCard = (data) => {
  cards.textContent = "";
  data.results.forEach((item) => {
    //console.log(item);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("img").setAttribute("src", item.image);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("p.text-secundary").textContent = item.species;
    clone.querySelector("p.text-success").textContent = item.gender;
    fragment.append(clone);
  });
  cards.append(fragment);
  paintPages(data.info);
};

//Function painting spinner loading.
const loadingData = (state) => {
  state ? loading.classList.remove("d-none") : loading.classList.add("d-none");
};
