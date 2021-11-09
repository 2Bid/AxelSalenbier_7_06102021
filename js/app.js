import { recipes } from "./data.js";

let selectedTags = []
let selectedIngredients = []
let selectedAppliances = []
let selectedUstensils = []
let tagType = ''

async function affichage(recettes){
     const templateRecette = document.getElementById('recette-article')
     const container = document.querySelector('.article-container')
     const setRecettes = Array.from(recettes)

     container.innerText = ""

     if(recettes.size <= 0){
          const noRecipe = document.createElement('p')
          noRecipe.classList = 'noRecipe'
          noRecipe.innerText = "Aucune recette ne correspond à votre critère... vous pouvez chercher tarte aux pommes , poisson , etc."
          container.appendChild(noRecipe)
     }
     
     recettes.forEach(function(item){
          
          let clone = templateRecette.content.cloneNode(true);
          clone.querySelector('.nom').textContent = item.name

          item.ingredients.forEach(function(item){
               const ingredient = document.createElement('div')
               ingredient.className="ingredient"
               
               if(item.unit){
                    ingredient.textContent = `${item.ingredient}: ${item.quantity} ${item.unit}`
               }
               else if(item.quantity){
                    ingredient.textContent = `${item.ingredient}: ${item.quantity}`
               }
               else{
                    ingredient.textContent = item.ingredient
               }
               clone.querySelector('.liste').appendChild(ingredient)
          })

          clone.querySelector('.temps').textContent = `${item.time} min`
          clone.querySelector('.desc').textContent = item.description

          container.appendChild(clone)
     })
     await getIngredient(setRecettes)
     await getAppareils(setRecettes)
     await getUstensils(setRecettes)
}

await affichage(recipes)

// Affiche chaque ingrédients dans le dropdown
async function getIngredient(recette){
     let totalIngredient = []
     let ingredientDropdown = document.getElementById('dropdown-ingredients')
     let li
     const cetteRecette = recette || recipes

     ingredientDropdown.innerText = ''

     let a = cetteRecette.map(recipe => recipe.ingredients)
     totalIngredient = a.flat()
     totalIngredient = totalIngredient.map(ingredient=>ingredient.ingredient)

     totalIngredient = [... new Set(totalIngredient)]
     totalIngredient.forEach(ingredient=>{
          li = document.createElement('li')
          li.classList = 'dropdown-item'
          li.textContent = ingredient
          ingredientDropdown.appendChild(li)

          li.addEventListener('click',(e)=>{
               if(!selectedIngredients.includes(e.target.innerText)){
                    selectedIngredients.push(e.target.innerText)
               }
               tagType = 'ingredient'
               rechercheTag(e.target.innerText)
               createTag(e.target.innerText, tagType)
          })
     })
}

// Affiche chaque appareils dans le dropdown
async function getAppareils(recette){
     let totalAppareil = []
     let appareilDropdown = document.getElementById('dropdown-appareils')
     let li
     const cetteRecette = recette || recipes

     appareilDropdown.innerText = ''

     let a = cetteRecette.map(recipe => recipe.appliance)
     totalAppareil = a.flat()
     totalAppareil = totalAppareil.map(appliance=>appliance)

     totalAppareil = [... new Set(totalAppareil)]
     totalAppareil.forEach(appliance=>{
          li = document.createElement('li')
          li.classList = 'dropdown-item'
          li.textContent = appliance
          appareilDropdown.appendChild(li)
          li.addEventListener('click',(e)=>{
               if(!selectedAppliances.includes(e.target.innerText)){
                    selectedAppliances.push(e.target.innerText)
               }
               tagType = 'appareil'
               rechercheTag(e.target.innerText)
               createTag(e.target.innerText, tagType)
          })
     })
}

// Affiche chaque ustensils dans le dropdown
async function getUstensils(recette){
     let totalUstensils = []
     let ustensilsDropdown = document.getElementById('dropdown-ustensils')
     let li
     const cetteRecette = recette || recipes

     ustensilsDropdown.innerText = ""
     
     let a = cetteRecette.map(recipe => recipe.ustensils)
     totalUstensils = a.flat()
     totalUstensils = totalUstensils.map(ustensils=>ustensils)

     totalUstensils = [... new Set(totalUstensils)]
     totalUstensils.forEach(ustensils=>{
          li = document.createElement('li')
          li.classList = 'dropdown-item'
          li.textContent = ustensils
          ustensilsDropdown.appendChild(li)
          li.addEventListener('click',(e)=>{
               if(!selectedUstensils.includes(e.target.innerText)){
                    selectedUstensils.push(e.target.innerText)
               }
               tagType = 'ustensil'
               rechercheTag(e.target.innerText)
               createTag(e.target.innerText, tagType)
          })
     })
}



// recherche de recette par ingredient,nom ou description via le champs input si le champs est > 3
const input = document.getElementById('input')

input.addEventListener('keyup', async function(){
     const inputValue = input.value
     if(inputValue.length > 2){
          rechercheInput(inputValue)
     }
     if(!inputValue || inputValue.length < 3){
          affichage(recipes)
     }
})

//recherche de recettes via l'input
function rechercheInput(texte){
     const normalizeText = texte.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
     const recetteFiltrer = recipes.filter(item=>(
          item.name.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizeText)
          || 
          item.description.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizeText)
          ||
          item.ingredients.map(ingredient=>ingredient.ingredient).some(ingredientName=>ingredientName.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizeText))
     ))
     
     affichage(new Set(recetteFiltrer))
}

// recherche de recettes par tag via les dropdown
function rechercheTag(){
     const recetteFiltrer = recipes.filter(item=>{

          const inputValue = document.querySelector('#input').value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
          
          const ingredientNames = item.ingredients.map(ingredient=>ingredient.ingredient)
          const appliance = item.appliance
          const ustensil = item.ustensils
          
          return selectedIngredients.every(item => ingredientNames.includes(item))
               && selectedAppliances.every(item => appliance == item)
               && selectedUstensils.every(item => ustensil.includes(item))

               && 
               (item.name.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               || 
               item.description.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               ||
               item.ingredients.map(ingredient=>ingredient.ingredient).some(ingredientName=>ingredientName.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               )
          )
     })

     affichage(new Set(recetteFiltrer))
}

//genere un span sous l'input avec le tag qui vient d'être sélectionée
function createTag(texte, type){
     const span = document.createElement('span')
     const ingredientsContainer = document.querySelector('.ingredients-tags-container')
     const appareilsContainer = document.querySelector('.appareils-tags-container')
     const ustensilsContainer = document.querySelector('.ustensils-tags-container')
     switch (type) {
          case 'ingredient':
               span.classList = 'selected-tag ingredient-tag'
               ingredientsContainer.appendChild(span)
               break;
          case 'appareil':
               span.classList = 'selected-tag appareil-tag'
               appareilsContainer.appendChild(span)
               break;
          case 'ustensil':
               span.classList = 'selected-tag ustensil-tag'
               ustensilsContainer.appendChild(span)
               break;
     
          default:
               break;
     }
     span.innerHTML = `${texte}<i class='far fa-times-circle'></i>`
     selectedTags.push(span)     
     selectedTags.forEach(item=>item.lastChild.addEventListener('click',deleteTag))
}


// permet de supprimer un tag
function deleteTag(item){
     item.target.parentNode.remove()

     //verifions s'il est present dans les var globale selectedName pour le supprimer
     const nameTag = item.target.parentNode.innerText
     selectedUstensils.includes(nameTag) ? selectedUstensils.pop(nameTag) : ''
     selectedAppliances.includes(nameTag) ? selectedAppliances.pop(nameTag) : ''
     selectedIngredients.includes(nameTag) ? selectedIngredients.pop(nameTag) : ''

     //reaffichons les recettes correspondantes
     const recetteFiltrer = recipes.filter(item=>{

          const inputValue = document.querySelector('#input').value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
          
          const ingredientNames = item.ingredients.map(ingredient=>ingredient.ingredient)
          const appliance = item.appliance
          const ustensil = item.ustensils

          return selectedIngredients.every(item => ingredientNames.includes(item))
               && selectedAppliances.every(item => appliance == item)
               && selectedUstensils.every(item => ustensil.includes(item))

               && 
               (
               item.name.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               || 
               item.description.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               ||
               item.ingredients.map(ingredient=>ingredient.ingredient).some(ingredientName=>ingredientName.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputValue)
               )
          )
     })

     affichage(new Set(recetteFiltrer))
}

// que se passe t-il si on commence recherche par tag, puis afinement par input ? 