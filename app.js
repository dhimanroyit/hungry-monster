const baseURL = "https://www.themealdb.com/api/json/v1/1/"
const searchMealHandler = (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search__input");
  const searchURL = `${baseURL}search.php?s=${searchInput.value}`;
  fetch(searchURL)
    .then(res => res.json())
    .then(data =>  createMeals(data.meals))
    .catch(err => console.error(err));
  
}

const mealDetailsHandler = (idMeal) => {
  const detailsURL = `${baseURL}lookup.php?i=${idMeal}`
  fetch(detailsURL)
    .then(res => res.json())
    .then(data => createMealDetails(data.meals[0]))
    .catch(err => console.error(err));
}

const searchForm = document.getElementById("search__form");
searchForm.addEventListener("submit", searchMealHandler)

const createMeals = (meals) => {
  const mealsElement = document.getElementById("meals")
  const mealContainer = document.getElementById("meal-details-container");
  mealContainer.innerHTML = "";
  if(meals === null) {
    mealsElement.innerHTML = `<h1 style="color: #F06C4E">There is no Meal</h1>`
  }
  else {
      mealsElement.innerHTML = "";
      meals.forEach(({idMeal, strMealThumb, strMeal}) => {
      const meal = document.createElement('div');
      meal.className = "meal";
      meal.addEventListener("click", ()=> {
        mealDetailsHandler(idMeal)
      })
      const mealMedia = document.createElement('div');
      mealMedia.className = "meal__media";
  
      const mealImg = document.createElement('img');
      mealImg.className = "meal__img";
      mealImg.src = strMealThumb
  
      const mealTitle = document.createElement('h2');
      mealTitle.className = "meal__title";
      mealTitle.innerText = strMeal;
  
      mealMedia.appendChild(mealImg)
      meal.appendChild(mealMedia);
      meal.appendChild(mealTitle);
      mealsElement.appendChild(meal)
  
    })
  }
}

const createMealDetails = (meal) => {
  const mealContainer = document.getElementById("meal-details-container");
  mealContainer.innerHTML = "";
  console.log(meal);
  const mealDetails = document.createElement('div');
  mealDetails.className = "meal-details"

  const mealMedia = document.createElement('div');
  mealMedia.className = "meal-details__media";

  const mealImg = document.createElement('img')
  mealImg.className = "meal-details__img";
  mealImg.src = meal.strMealThumb;

  const mealTitle = document.createElement('h1');
  mealTitle.className = "meal-details__title";
  mealTitle.innerText = meal.strMeal;

  const mealIngredientTitle = document.createElement('h3');
  mealIngredientTitle.className = "meal-details__ingredient-title";
  mealIngredientTitle.innerText = "Ingredient";

  const ingredientList = document.createElement('ul');
  ingredientList.className = "meal-details__ingredient"

  const ingredientArr = [];
  for(let i = 1; i <= 20; i++) {
    ingredientArr.push(meal[`strIngredient${i}`])
  }
  ingredientArr.forEach(ingredient => {
    if(ingredient) {
      const ingredientListItem = document.createElement('li');
      ingredientListItem.className = "meal-details__ingredient-item";
      ingredientListItem.innerText = ingredient;
      ingredientList.appendChild(ingredientListItem)
    }
  })

  mealMedia.appendChild(mealImg);
  mealDetails.appendChild(mealMedia)
  mealDetails.appendChild(mealTitle)
  mealDetails.appendChild(mealIngredientTitle)
  mealDetails.appendChild(ingredientList)
  mealContainer.appendChild(mealDetails)
}