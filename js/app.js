/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import recipes from './data.js';

const selectedTags = [];
const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensils = [];
let tagType = '';

async function affichage(recettes) {
  const templateRecette = document.getElementById('recette-article');
  const container = document.querySelector('.article-container');
  const setRecettes = Array.from(recettes);

  container.innerText = '';

  if (recettes.size <= 0) {
    const noRecipe = document.createElement('p');
    noRecipe.classList = 'noRecipe';
    noRecipe.innerText = 'Aucune recette ne correspond à votre critère... vous pouvez chercher tarte aux pommes , poisson , etc.';
    container.appendChild(noRecipe);
  }

  recettes.forEach((recette) => {
    const clone = templateRecette.content.cloneNode(true);
    clone.querySelector('.nom').textContent = recette.name;

    recette.ingredients.forEach((item) => {
      const ingredient = document.createElement('div');
      ingredient.className = 'ingredient';

      if (item.unit) {
        ingredient.textContent = `${item.ingredient}: ${item.quantity} ${item.unit}`;
      } else if (item.quantity) {
        ingredient.textContent = `${item.ingredient}: ${item.quantity}`;
      } else {
        ingredient.textContent = item.ingredient;
      }
      clone.querySelector('.liste').appendChild(ingredient);
    });

    clone.querySelector('.temps').textContent = `${recette.time} min`;
    clone.querySelector('.desc').textContent = recette.description;

    container.appendChild(clone);
  });
  await getIngredient(setRecettes);
  await getAppareils(setRecettes);
  await getUstensils(setRecettes);
}

await affichage(recipes);

// Affiche chaque ingrédients dans le dropdown
async function getIngredient(recette) {
  let totalIngredient = [];
  const ingredientDropdown = document.getElementById('dropdown-ingredients');
  let li;
  const cetteRecette = recette || recipes;

  ingredientDropdown.innerText = '';

  const liInput = document.createElement('li');
  const input = document.createElement('input');
  input.placeholder = 'Recherchez un ingrédient';
  input.classList = 'dropdown-input';
  liInput.appendChild(input);
  ingredientDropdown.appendChild(liInput);

  const a = cetteRecette.map((recipe) => recipe.ingredients);
  totalIngredient = a.flat();
  totalIngredient = totalIngredient.map((ingredient) => ingredient.ingredient);

  totalIngredient = [...new Set(totalIngredient)];
  totalIngredient.forEach((ingredient) => {
    li = document.createElement('li');
    li.classList = 'dropdown-item';
    li.textContent = ingredient;
    ingredientDropdown.appendChild(li);

    li.addEventListener('click', (e) => {
      if (!selectedIngredients.includes(e.target.innerText)) {
        selectedIngredients.push(e.target.innerText);
      }
      tagType = 'ingredient';
      rechercheTag(e.target.innerText);
      createTag(e.target.innerText, tagType);
    });
  });

  input.addEventListener('keyup', (e) => {
    rechercheInputIngredient(e);
  });
}

function rechercheInputIngredient(input) {
  const ingredientsDd = Array.from(document.querySelectorAll('.ingredients-container .dropdown-item'));
  for (const ingredient of ingredientsDd) {
    // Normalize les textes
    const ingredientName = ingredient.textContent.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const inputTexte = input.target.value.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    // Verifie si un appareil correspond avec les caractere present dans le champ input
    if (!ingredientName.includes(inputTexte)) {
      ingredient.style.display = 'none';
    } else {
      ingredient.style.display = 'block';
    }
  }
}

// Affiche chaque appareils dans le dropdown
async function getAppareils(recette) {
  let totalAppareil = [];
  const appareilDropdown = document.getElementById('dropdown-appareils');
  let li;
  const cetteRecette = recette || recipes;

  appareilDropdown.innerText = '';

  const liInput = document.createElement('li');
  const input = document.createElement('input');
  input.placeholder = 'Recherchez un appareil';
  input.classList = 'dropdown-input';
  liInput.appendChild(input);
  appareilDropdown.appendChild(liInput);

  const a = cetteRecette.map((recipe) => recipe.appliance);
  totalAppareil = a.flat();
  totalAppareil = totalAppareil.map((appliance) => appliance);

  totalAppareil = [...new Set(totalAppareil)];
  totalAppareil.forEach((appliance) => {
    li = document.createElement('li');
    li.classList = 'dropdown-item';
    li.textContent = appliance;
    appareilDropdown.appendChild(li);
    li.addEventListener('click', (e) => {
      if (!selectedAppliances.includes(e.target.innerText)) {
        selectedAppliances.push(e.target.innerText);
      }
      tagType = 'appareil';
      rechercheTag(e.target.innerText);
      createTag(e.target.innerText, tagType);
    });
  });

  input.addEventListener('keyup', (e) => {
    rechercheInputAppareil(e);
  });
}

function rechercheInputAppareil(input) {
  const appareilDd = Array.from(document.querySelectorAll('.appareil-container .dropdown-item'));
  for (const appareil of appareilDd) {
    // Normalize les textes
    const appareilName = appareil.textContent.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const inputTexte = input.target.value.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    // Verifie si un appareil correspond avec les caractere present dans le champ input
    if (!appareilName.includes(inputTexte)) {
      appareil.style.display = 'none';
    } else {
      appareil.style.display = 'block';
    }
  }
}

// Affiche chaque ustensils dans le dropdown
async function getUstensils(recette) {
  let totalUstensils = [];
  const ustensilsDropdown = document.getElementById('dropdown-ustensils');
  let li;
  const cetteRecette = recette || recipes;

  ustensilsDropdown.innerText = '';

  const liInput = document.createElement('li');
  const input = document.createElement('input');
  input.placeholder = 'Recherchez un ustensil';
  input.classList = 'dropdown-input';
  liInput.appendChild(input);
  ustensilsDropdown.appendChild(liInput);

  const a = cetteRecette.map((recipe) => recipe.ustensils);
  totalUstensils = a.flat();
  totalUstensils = totalUstensils.map((ustensils) => ustensils);

  totalUstensils = [...new Set(totalUstensils)];
  totalUstensils.forEach((ustensils) => {
    li = document.createElement('li');
    li.classList = 'dropdown-item';
    li.textContent = ustensils;
    ustensilsDropdown.appendChild(li);
    li.addEventListener('click', (e) => {
      if (!selectedUstensils.includes(e.target.innerText)) {
        selectedUstensils.push(e.target.innerText);
      }
      tagType = 'ustensil';
      rechercheTag(e.target.innerText);
      createTag(e.target.innerText, tagType);
    });
  });

  input.addEventListener('keyup', (e) => {
    rechercheInputUstensils(e);
  });
}

function rechercheInputUstensils(input) {
  const ustensilsDd = Array.from(document.querySelectorAll('.ustensils-container .dropdown-item'));
  for (const ustensil of ustensilsDd) {
    // Normalize les textes
    const ustensilName = ustensil.textContent.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const inputTexte = input.target.value.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    // Verifie si un appareil correspond avec les caractere present dans le champ input
    if (!ustensilName.includes(inputTexte)) {
      ustensil.style.display = 'none';
    } else {
      ustensil.style.display = 'block';
    }
  }
}

// recherche de recette par ingredient,nom ou description via le champs input si le champs est > 3
const input = document.getElementById('input');

input.addEventListener('keyup', async () => {
  const inputValue = input.value;
  if (inputValue.length > 2) {
    rechercheInput(inputValue);
  }
  if (!inputValue || inputValue.length < 3) {
    affichage(recipes);
  }
});

// recherche de recettes via l'input
function rechercheInput(texte) {
  const normalizeText = texte.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const recetteFiltrer = recipes.filter((item) => (
    item.name.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(normalizeText)
    || item.description.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(normalizeText)
    || item.ingredients.map((ingredient) => ingredient.ingredient).some((ingredientName) => ingredientName.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(normalizeText))
  ));

  affichage(new Set(recetteFiltrer));
}

// recherche de recettes par tag via les dropdown
function rechercheTag() {
  const recetteFiltrer = recipes.filter((ingredientInTag) => {
    const inputValue = document.querySelector('#input').value.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const ingredientNames = ingredientInTag.ingredients.map(
      (ingredient) => ingredient.ingredient.toLowerCase(),
    );
    const appliance = ingredientInTag.appliance.toLowerCase();
    const ustensils = ingredientInTag.ustensils.map((ustensil) => ustensil.toLowerCase());

    return (selectedIngredients.every(
      (ingredient) => ingredientNames.includes(ingredient.toLowerCase()),
    ))
    && (selectedAppliances.every(
      (appareil) => appliance.includes(appareil.toLowerCase()),
    ))
    && (selectedUstensils.every(
      (ustensil) => ustensils.includes(ustensil.toLowerCase()),
    ))

    && (ingredientInTag.name.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue)
    || ingredientInTag.description.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue)
    || ingredientInTag.ingredients.map((ingredient) => ingredient.ingredient).some((ingredientName) => ingredientName.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue))
    );
  });

  affichage(new Set(recetteFiltrer));
}

// genere un span sous l'input avec le tag qui vient d'être sélectionée
function createTag(texte, type) {
  const span = document.createElement('span');
  const ingredientsContainer = document.querySelector('.ingredients-tags-container');
  const appareilsContainer = document.querySelector('.appareils-tags-container');
  const ustensilsContainer = document.querySelector('.ustensils-tags-container');
  switch (type) {
    case 'ingredient':
      span.classList = 'selected-tag ingredient-tag';
      ingredientsContainer.appendChild(span);
      break;
    case 'appareil':
      span.classList = 'selected-tag appareil-tag';
      appareilsContainer.appendChild(span);
      break;
    case 'ustensil':
      span.classList = 'selected-tag ustensil-tag';
      ustensilsContainer.appendChild(span);
      break;

    default:
      break;
  }
  span.innerHTML = `${texte}<i class='far fa-times-circle'></i>`;
  selectedTags.push(span);
  selectedTags.forEach((item) => item.lastChild.addEventListener('click', deleteTag));
}

// permet de supprimer un tag
function deleteTag(item) {
  item.target.parentNode.remove();

  // verifions s'il est present dans les var globale selectedName pour le supprimer
  const nameTag = item.target.parentNode.innerText;
  if (selectedUstensils.includes(nameTag)) {
    selectedUstensils.pop(nameTag);
  }
  if (selectedAppliances.includes(nameTag)) {
    selectedAppliances.pop(nameTag);
  }
  if (selectedIngredients.includes(nameTag)) {
    selectedIngredients.pop(nameTag);
  }

  // reaffichons les recettes correspondantes
  const recetteFiltrer = recipes.filter((ingredientInTag) => {
    const inputValue = document.querySelector('#input').value.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    const ingredientNames = ingredientInTag.ingredients.map(
      (ingredient) => ingredient.ingredient.toLowerCase(),
    );
    const appliance = ingredientInTag.appliance.toLowerCase();
    const ustensils = ingredientInTag.ustensils.map((ustensil) => ustensil.toLowerCase());

    return (selectedIngredients.every(
      (ingredient) => ingredientNames.includes(ingredient.toLowerCase()),
    ))
    && (selectedAppliances.every(
      (appareil) => appliance.includes(appareil.toLowerCase()),
    ))
    && (selectedUstensils.every(
      (ustensil) => ustensils.includes(ustensil.toLowerCase()),
    ))

    && (ingredientInTag.name.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue)
    || ingredientInTag.description.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue)
    || ingredientInTag.ingredients.map((ingredient) => ingredient.ingredient).some((ingredientName) => ingredientName.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(inputValue))
    );
  });

  affichage(new Set(recetteFiltrer));
}

function dropdownToggle(e) {
  const ddMenus = document.querySelectorAll('.dropdown-menu.show');
  const arrow = e.target.lastElementChild;
  const arrowBas = document.querySelector('.fas.fa-chevron-up.chevron-down');
  const ddMenu = e.target.nextElementSibling;

  if (e.target.className === 'dropdown-input' || e.target.className === 'dropdown-item') {
    return;
  }

  for (const menu of ddMenus) {
    if (menu !== ddMenu) {
      menu.classList = 'dropdown-menu';
      arrowBas.classList = 'fas fa-chevron-up';
    }
  }

  ddMenu.classList.toggle('show');
  arrow.classList.toggle('chevron-down');

  e.stopImmediatePropagation();
}

const dd = document.querySelectorAll('.dropdown:not(.dropdown-input)');
for (const item of dd) {
  item.addEventListener('click', dropdownToggle);
}

// dropdown toggle s'active si on clique sur l'icone
const arrowDropDown = document.querySelectorAll('.fa-chevron-up');
arrowDropDown.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    e.target.parentElement.click();
    e.stopImmediatePropagation();
  });
});

const dropdowns = document.querySelectorAll('.dropdown-toggle');
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    e.target.parentElement.click();
    e.stopImmediatePropagation();
  });
});

// ferme le dropdown si on clique ailleurs
window.addEventListener('click', (e) => {
  const menu = document.querySelector('.dropdown-menu.show');
  const classe = e.target.className;
  const arrowDown = document.querySelector('.chevron-down');
  if
  (
    ((!classe.includes('dropdown')) && (!classe.includes('chevron')))
  || ((!classe.includes('chevron')) && (!classe.includes('dropdown')))
  ) {
    // si la condition précedente est rempli et qu'un menu est ouvert, le ferme et reset la fleche
    if (menu) {
      menu.classList = 'dropdown-menu';
      arrowDown.classList = 'fas fa-chevron-up';
    }
  }
});
