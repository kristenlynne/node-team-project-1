const getRecipe = (data) => {
    

    document.querySelector('#foodSteps').textContent =
    data.steps.forEach((step) => {
        const li = document.createElement('li')

        li.textContent = step
        document.querySelector('#foodSteps').appendChild(li)
    })
    const timeEstimate =  document.querySelector('#timeEstimate')
    timeEstimate.textContent = "Estimated prep time: " + data.timers.reduce((a, b) => a + b) + " minutes"

    document.querySelector('#foodImg').src = data.imageURL
    document.querySelector('#foodURL').textContent = data.originalURL

    data.ingredients.forEach(data => {
        const items = document.createElement('li');
        items.textContent = `${data.quantity} of ${data.name} `
        document.querySelector('#foodInstructions').appendChild(items)
    })
}

const clearAll = () => {
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
    const data = prelimData[0]
    const currentItem = document.querySelector("#food").innerHTML
    console.log(data.name)
    console.log(foodName)
    
    
    if (data.name === foodName) {
        getRecipe(data)
    } else {
        document.querySelector('#foodName').textContent="Sorry, we don't have that recipe"
    }



    // if (!data) {
    //     clearAll();
    //     document.querySelector('#foodName').textContent = "I don't know how to make that"
    // }
    // else if (currentItem !== foodName) {
    //     getRecipe(data)
    // } else if (data.name === foodName) {
    //     console.log('Already showing this recipe')
    // }
}

document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#clearMe').addEventListener('click', clearAll)

