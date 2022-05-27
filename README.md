# Our Awesome Project

<ul>
<li>Andrew
    <ul>
      <li> <a href="https://github.com/muckitymuck">GitHub</a>
    </ul>
    <li>Kristen
    <ul>
      <li> <a href="https://github.com/kristenlynne">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/kristen-lynne/">LinkedIn</a>
    </ul>
  <li>Terrance
    <ul>
      <li> <a href="https://github.com/JScrips">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/jscrips/">LinkedIn</a>
    </ul> 
  <li>Greg
    <ul>
      <li> <a href="https://github.com/gregnicotera">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/gregorynicotera/">LinkedIn</a>
    </ul>
    <li>Joseph
    <ul>
      <li> <a href="https://github.com/itsdaijoebu/">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/joseph-ys-chan/">LinkedIn</a>
    </ul>
    <li>Steve
    <ul>
      <li> <a href="https://github.com/StevenChesney">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/steve-chesney-6ba91687/">LinkedIn</a>
    </ul>
     <li>Olivia
    <ul>
      <li> <a href="https://github.com/BBlivia">GitHub</a>
      <li> <a href="https://www.linkedin.com/in/liv-bloway/">LinkedIn</a>
    </ul>
</ul>

_Our Awesome Project_ was created by a group of engineers at #100Devs. This full-stack application will return a recipe, instructions, cook time, and images of food based on the entries.

![Our Awesome Food App](/images/FoodApp.PNG)

**Link to project:** http://our-awesome-food-app-.pending/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js

We debated long about what we wanted to create, upon discussion it was discovered that everyone loved food.... _Go Figure_.

# Back-End

Utilizing different Node methods, we set up the server in such a way that when you type in a designated 'food' and submit the api request, users will receive a JSON response via a function:

```js
const getRecipe = (recipeName) => {
  let recipe = recipes.filter(
    (e) => e.name.toLowerCase() === recipeName.toLowerCase()
  );
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(recipe));
};
```

This function takes in the given params, filters through a JSON file containing an array of recipes with:

```js
let recipe = recipes.filter(
  (e) => e.name.toLowerCase() === recipeName.toLowerCase()
);
```

This matches the input with an array item while simultaneously altering the input casing to ensure the information is received correctly. This takes the stress off of the user for worrying about case-sensitivity. After filtering the recipe array, a JSON object is stringified and returned to the front end for the user's viewing pleasure:

```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(recipe));
```

# Front-End

On the Front End, we went straightforward. There's a simple Input text, a submit button, and a clear button. The subsequent tags and headers are hidden from view, and are populated upon a successful API call.

```js
<body>
    <h1>Look At My Food, My Food Is Amazing</h1>
    <input id="food" type="text" name="" placeholder="Enter Name">
    <button id="clickMe" type="button" name="button">Search</button>
    <button id="clearMe" type="button" name="newButton"> Clear </button>

    <img id="foodImg" src=""> </img>
    <a href="" id="foodURL"></a>
    <h2 id="foodName"></h2>
    <span id="timeEstimate"></span>
    <ul id="foodInstructions"></ul>
    <ul id="foodSteps"></ul>




    <script type="text/javascript" src="js/main.js"></script>
  </body>
```

The Javascript logic that we used is as follows:

```js
const getRecipe = (data) => {
  // populate the foodSteps div with the steps
  document.querySelector("#foodSteps").textContent = data.steps.forEach(
    (step) => {
      const li = document.createElement("li");

      li.textContent = step;
      document.querySelector("#foodSteps").appendChild(li);
    }
  );

  // populate the time Estimate div with the time estimate
  const timeEstimate = document.querySelector("#timeEstimate");
  timeEstimate.textContent =
    "Estimated prep time: " + data.timers.reduce((a, b) => a + b) + " minutes";

  // populate the foodImg div with the image
  document.querySelector("#foodImg").src = data.imageURL;

  // populate the foodURL div with the url
  document.querySelector("#foodURL").textContent = data.originalURL;

  // populate the foodInstructions div with the instructions
  data.ingredients.forEach((data) => {
    const items = document.createElement("li");
    items.textContent = `${data.quantity} of ${data.name} `;
    document.querySelector("#foodInstructions").appendChild(items);
  });
};
```

The JSON object that we get in return from the API call is composed of arrays, and objects, and need to be destructured to present the information to the user in a readable way:

```js
// "data" JSON object that is returned from API Call
{
        "name": "Crock Pot Roast",
        "ingredients": [
            {
                "quantity": "1",
                "name": " beef roast",
                "type": "Meat"
            },
            {
                "quantity": "1 package",
                "name": "brown gravy mix",
                "type": "Baking"
            },
            {
                "quantity": "1 package",
                "name": "dried Italian salad dressing mix",
                "type": "Condiments"
            },
            {
                "quantity": "1 package",
                "name": "dry ranch dressing mix",
                "type": "Condiments"
            },
            {
                "quantity": "1/2 cup",
                "name": "water",
                "type": "Drinks"
            }
        ],
        "steps": [
            "Place beef roast in crock pot.",
            "Mix the dried mixes together in a bowl and sprinkle over the roast.",
            "Pour the water around the roast.",
            "Cook on low for 7-9 hours."
        ],
        "timers": [
            0,
            0,
            0,
            420
        ],
        "imageURL": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
        "originalURL": "http://www.food.com/recipe/to-die-for-crock-pot-roast-27208"
    }
```

Each step of the `js getRecipe()` function inside of main.js takes a piece of the JSON object and destructures it to present to the user the logic also follows a similar syntax:

# For Arrays

```js
document.querySelector("#foodSteps").textContent = data.steps.forEach(
  (step) => {
    const li = document.createElement("li");

    li.textContent = step;
    document.querySelector("#foodSteps").appendChild(li);
  }
);
```

`document.querySelector("#foodSteps")` -- is used to target the `<ul id="foodSteps"></ul>` in our HTML. in Javascript this is shown as an Object, so we can follow it up with a method `.textContent`.

`.textContent = data.steps.forEach` -- is used in this context to populate the targeted `<ul id="foodSteps"></ul>` object with information recieved from the array located within our JSON object which looks like this:

```js
// data.steps

[
  "Place beef roast in crock pot.", //i=0
  "Mix the dried mixes together in a bowl and sprinkle over the roast.", //i=1
  "Pour the water around the roast.", //i=2
  "Cook on low for 7-9 hours.", //i=3
];
```

`forEach` loops through this array and for each string within the array, an `<li>` element is created, filled with the string, and then appended to the original `document.querySelector("#foodSteps")` object.

## Optimizations

_(optional)_

You don't have to include this section but interviewers _love_ that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!

## Lessons Learned:

> _Personally, I had a phenomenal experience coding with others, I learned a lot about back-end development, spinning up servers, and how meticulous accuracy is necessary to provide efficient and functional API responses. Most of all though, I learned a lot about myself in collaborative environments. Everyone has a different way of thinking and coding, and it's imperative to be open minded and flexible. The beautiful thing about Javascript is there are so many different ways to produce the same outcome._ - Terrance B.

No matter what your experience levl, being an engineer means continuously learning. Every time you build something you always have those _whoa this is awesome_ or _fuck yeah I did it!_ moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel
