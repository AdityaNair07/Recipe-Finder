const app_id = "5b31dc49";
const app_key = "f7420d2cccf0b3c1ea1dca0e789bf725";

var button = document.querySelector("button");
console.log(button);

const get_recipe = async () => {
  var input = document.querySelector("input");

  console.log(input);
  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${input.value}&app_id=${app_id}&app_key=${app_key}`
  );
  var data = await response.json();

  console.log(data);
  var cards = document.querySelector(".cards-section");
  cards.innerHTML = "";
  for (let i = 0; i < data.hits.length; i++) {
    cards.innerHTML += `
  <div class="card">
  <div class="card_body">
    <img src="${data.hits[i].recipe.image} "class="card_image"/>
    <h2 class="card_title">${data.hits[i].recipe.label}</h2>
    <p class="card_description">${data.hits[i].recipe.ingredientLines.join(
      "<br>"
    )}</p>
  </div>
  <div class ="card_actions">
  <a href="${data.hits[i].recipe.url}" class="card_btn">View Recipe</a>
</div>
</div>`;
  }
};

button.addEventListener("click", get_recipe);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value;

  recipeList.innerHTML = "";

  fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.hits.forEach((hit) => {
        const recipe = hit.recipe;
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.label}">
          <h2>${recipe.label}</h2>
          <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;
        recipeList.appendChild(listItem);
      });
    })
    .catch((error) => console.error(error));
});
