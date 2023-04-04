const getRecipe = (data) => {
    
    data.steps.forEach(data => {
        const steps = document.createElement('li');
        steps.textContent = `${data}`;
        document.querySelector('#foodSteps').appendChild(steps);
        console.log(data);
    });

    const timeEstimate =  document.querySelector('#timeEstimate')
    timeEstimate.textContent = "Estimated prep time: " + data.timers.reduce((a, b) => a + b) + " minutes"

    document.querySelector('#foodImg').src = data.imageURL
    document.querySelector('#foodURL').textContent = data.originalURL
    document.querySelector('#foodName').textContent = data.name

    data.ingredients.forEach(data => {
        const items = document.createElement('li');
        items.textContent = `${data.quantity} of ${data.name} `
        document.querySelector('#foodInstructions').appendChild(items)
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
    console.log('prelimData', prelimData)
    console.log('data', data)
    console.log('data.name', data.name)
    console.log('foodName', foodName)
    
    if (data.name.toLowerCase() === foodName.toLowerCase()) {
        getRecipe(data)
    } else {
        document.querySelector('#foodName').textContent="Sorry, we don't have that recipe"
    }
}

document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#clickMe').addEventListener('click', clearAll)
document.querySelector('#clearMe').addEventListener('click', clearAll)