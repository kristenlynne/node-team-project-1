const getRecipe = (data) => {
    
    data.steps.forEach(data => {
        const steps = document.createElement('li');
        steps.textContent = `${data}`;
        document.querySelector('#foodSteps').appendChild(steps);
        document.querySelector('.instructions').textContent = 'Instructions'
        console.log(data);
    });

    // const timeEstimate =  document.querySelector('#timeEstimate')
    // timeEstimate.textContent = "Estimated prep time: " + data.timers.reduce((a, b) => a + b) + " minutes"

    function convertToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (hours === 0) {
          return `${remainingMinutes} minutes`;
        } else if (hours === 1) {
          if (remainingMinutes === 0) {
            return `1 hour`;
          } else {
            return `1 hour and ${remainingMinutes} minutes`;
          }
        } else {
          if (remainingMinutes === 0) {
            return `${hours} hours`;
          } else {
            return `${hours} hours and ${remainingMinutes} minutes`;
          }
        }
      }

    const timeEstimate = document.querySelector('#timeEstimate');
    const recipeTimeInMinutes = data.timers.reduce((a, b) => a + b);
    const formattedTime = convertToHoursAndMinutes(recipeTimeInMinutes);
    timeEstimate.textContent = "Estimated prep time: " + formattedTime;


    if (data.originalURL) {
        const link = document.querySelector('#foodURL')
        link.href = data.originalURL
        link.textContent = 'Recipe Link'
    }

    document.querySelector('#foodImg').src = data.imageURL
    document.querySelector('#foodName').textContent = data.name

    data.ingredients.forEach(data => {
        const items = document.createElement('li');
        items.textContent = `${data.quantity} of ${data.name} `
        document.querySelector('#foodInstructions').appendChild(items)
        document.querySelector('.ingredients').textContent = 'Ingredients'
    })
}

const clearAll = () => {
    document.querySelector('#food').value = ''
    document.querySelector('#foodName').textContent = ''
    document.querySelector('#foodSteps').innerHTML = ''
    document.querySelector('#foodImg').src = ''
    document.querySelector('#foodURL').textContent = ''
    document.querySelector('#foodInstructions').innerHTML = ''
    document.querySelector('#timeEstimate').textContent = ''
    document.querySelector('.ingredients').textContent = ''
    document.querySelector('.instructions').textContent = ''
}

const makeReq = async () => {
    const foodName = document.querySelector("#food").value;
    const res = await fetch(`/api?food=${foodName}`)
    const prelimData = await res.json();

    // prelimData was returning empty array for searches that weren't in the database.
    // had to add conditional to check if prelimData.length === 0 (empty array) then return message that we don't have that recipe.
    if (prelimData.length === 0) {
        document.querySelector('#foodName').textContent="Sorry, we don't have that recipe";
        console.log("No recipe found for:", foodName);
        return;
    }

    const data = prelimData[0]
    // const currentItem = document.querySelector("#food").innerHTML
    // console.log('prelimData', prelimData)
    // console.log('data', data)
    // console.log('data.name', data.name)
    // console.log('foodName', foodName)
    
    if (data.name.toLowerCase() === foodName.toLowerCase()) {
        getRecipe(data)
    } else {
        document.querySelector('#foodName').textContent="Sorry, we don't have that recipe"
    }
}


const appendRecipes = async () => {
    try {
        const res = await fetch('/api')
        const recipes = await res.json();
        console.log(recipes)

        const recipeList = document.querySelector('#recipes');
        recipes.forEach((recipe) => {
            const option = document.createElement('option');
            option.value = recipe.name;
            option.textContent = recipe.name;
            recipeList.appendChild(option);
        }); 
    } catch (err) {
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', appendRecipes);


const input = document.querySelector('#food');

input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        makeReq()
        event.preventDefault()
    }
})

document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#clickMe').addEventListener('click', clearAll)
document.querySelector('#clearMe').addEventListener('click', clearAll)