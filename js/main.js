document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const foodName = document.querySelector("#food").value;
  const res = await fetch(`/api?food=${foodName}`)
  const data = await res.json()

  console.log('data', data);
  document.querySelector("#foodName").textContent = data.name
  document.querySelector("#foodRecipe").textContent = data.ingredients.forEach()
  document.querySelector('#foodSteps')= data.steps
  document.querySelector('#foodTimers')  =data.timers
  document.querySelector('#foodImg') =data.imageURL
  document.querySelector('#foodURL') =data.originalURL
  document.querySelector("#foodInstructions").textContent = data.currentOccupation
}

recipes.forEach