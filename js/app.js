import { recipes } from "./data.js";

// affichage des recettes
async function affichage(recettes){
     const template = document.getElementById('recette-article')
     const container = document.querySelector('.article-container')
     container.innerText = ""
     recettes.forEach(function(item){
          let clone = template.content.cloneNode(true);
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
