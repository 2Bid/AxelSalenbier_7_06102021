import { recipes } from "./data.js";

async function affichage(recettes){
     const templateRecette = document.getElementById('recette-article')
     const container = document.querySelector('.article-container')
     container.innerText = ""
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
}

await affichage(recipes)

// Affiche chaque ingrédients dans le dropdown
function getIngredient(){
     let totalIngredient = []
     let ingredientDropdown = document.getElementById('dropdown-ingredients')
     let li

     recipes.forEach((recipe)=>{
          recipe.ingredients.map(ingredient=>{
               totalIngredient.push(ingredient.ingredient)
               li = document.createElement('li')
               li.classList = 'dropdown-item'
               li.textContent = ingredient.ingredient
               ingredientDropdown.appendChild(li)
          })

          // recipe.ingredients.reduce(
          //      function (sum, ingredient) {
          //           if(sum.indexOf(ingredient.ingredient) === -1) {
          //                totalIngredient.push(ingredient.ingredient)
          //                li = document.createElement('li')
          //                li.classList = 'dropdown-item'
          //                li.textContent = ingredient.ingredient
          //                ingredientDropdown.appendChild(li)
          //           }
          //           return sum
          //      }, []
          // );

     })
     totalIngredient = [... new Set(totalIngredient)]
     let totalIngredientFiltre = totalIngredient.values()
     
     console.log(Array.from(totalIngredientFiltre))
     
     
}

getIngredient()

// recherche par input
const input = document.getElementById('input')

input.addEventListener('keyup', async function(){
     const inputValue = input.value
     recherche(inputValue)
})

function recherche(texte){
     const recetteFiltrer = recipes.filter(item=>(
          item.name.toLocaleLowerCase().includes(texte.toLocaleLowerCase()) || 
          item.description.toLocaleLowerCase().includes(texte.toLocaleLowerCase()) ||
          item.ingredients.map(ingredient=>ingredient.ingredient).some(ingredientName=>ingredientName.toLocaleLowerCase().includes(texte))
     ))
     
     affichage(new Set(recetteFiltrer))
}