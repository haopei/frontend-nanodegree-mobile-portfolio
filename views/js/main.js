/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// Adjectives
var dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted", "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty", "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red", "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta","chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan", "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing", "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy", "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked", "brainwashed"];
var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise", "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy", "metallic"];
var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic", "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling", "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping", "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic", "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying", "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow", "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous", "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless", "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed", "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide", "horrible", "syncophantic", "unhelpful", "bootlicking"];
var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful", "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous", "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave", "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome", "majestic", "grand", "stunning"];
var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological", "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar", "extinct", "galactic"]
var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological", "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar", "extinct", "galactic"]

// Nouns
var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo", "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan", "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper", "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale", "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish", "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture", "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic","comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor", "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot","priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost", "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester", "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums", "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone","bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor","singer"];
var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf", "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter", "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath","fiend", "satanist", "moon", "fullMoon"];
var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm", "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance", "fluid", "moisture", "garbage", "trash", "bug"];
var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV","book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen","garden", "school", "wallet", "bottle"];
var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry", "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin","costume", "ornament", "treasure"];
var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood","city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery","shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy", "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars","quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus","universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];

var adjectives = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"];
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];

// Handles onsubmit for contact button
function contactUs () {
  alert('Thanks for clicking! This button doesn\'t do anything because this is a fake pizzeria :\)');
};

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
  switch(x) {
    case "dark":
      return dark;
    case "color": 
      return colors;
    case "whimsical": 
      return whimsy;
    case "shiny":
      return shiny;
    case "noisy":
      return noisy;
    case "apocalyptic":
      return apocalyptic;
    case "insulting":
      return insulting;
    case "praise":
      return praise;
    case "scientific":
      return scientific;
    default:
      return scientific;
  };
};

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
  switch(y) {
    case "animals": 
      return animals;
    case "profession": 
      return professions; 
    case "fantasy": 
      return fantasy;
    case "music":
      return music;
    case "horror":
      return horror;
    case "gross":
      return gross;
    case "everyday":
      return everyday;
    case "jewelry":
      return jewelry;
    case "places":
      return places;
    case "scifi":
      return scifi;
    default:
      return scifi;
  }; 
};

// Constants
var NUMBER_OF_PIZZA = 100,
    ADJ_LENGTH = adjectives.length,
    NOUN_LENGTH = nouns.length,
    MEAT_LENGTH = pizzaIngredients.meats.length,
    NONMEAT_LENGTH = pizzaIngredients.nonMeats.length,
    CHEESES_LENGTH = pizzaIngredients.cheeses.length,
    SAUCES_LENGTH = pizzaIngredients.sauces.length,
    CRUSTS_LENGTH = pizzaIngredients.crusts.length;


function randomNumber(range) {
  return Math.floor(Math.random() * range);
}

// - Returns pizza name
// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function pizzaNameGenerator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * ADJ_LENGTH);
  var randomNoun = parseInt(Math.random() * NOUN_LENGTH);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
};

// Chooses random adjective and random noun
function randomPizzaName() {
  var randomNumberAdj = parseInt(Math.random() * ADJ_LENGTH);
  var randomNumberNoun = parseInt(Math.random() * NOUN_LENGTH);
  return pizzaNameGenerator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
};

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  // var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * MEAT_LENGTH))];
  return pizzaIngredients.meats[randomNumber(MEAT_LENGTH)];
}

var selectRandomNonMeat = function() {
  return pizzaIngredients.nonMeats[randomNumber(NONMEAT_LENGTH)];
}

var selectRandomCheese = function() {
  return pizzaIngredients.cheeses[randomNumber(CHEESES_LENGTH)];
}

var selectRandomSauce = function() {
  return pizzaIngredients.sauces[randomNumber(SAUCES_LENGTH)];
}

var selectRandomCrust = function() {
  return pizzaIngredients.crusts[randomNumber(CRUSTS_LENGTH)];
}

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
}

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";
  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var i = 0; i < numberOfNonMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var i = 0; i < numberOfCheeses; i++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
}

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer  = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);

  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  // pizzaName.innerHTML = randomPizzaName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  // ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
}

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) { 
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    switch(size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }

  changeSliderLabel(size);

  // Returns the size difference to change a pizza element from one size to another. 
  // Called by changePizzaSizes(size).
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth; // offsetwidth causes extra work?
    var windowwidth = document.querySelector("div#randomPizzas").offsetWidth;
    var oldsize = oldwidth / windowwidth;

    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newsize = sizeSwitcher(size);
    var dx = (newsize - oldsize) * windowwidth;

    return dx;
  }

  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    var randomPizzaContainerAll = document.querySelectorAll(".randomPizzaContainer");
    var pizzaContainerLength = randomPizzaContainerAll.length;
    for (var i = 0; i < pizzaContainerLength; i++) {
      var dx = determineDx(randomPizzaContainerAll[i], size);
      var newwidth = (randomPizzaContainerAll[i].offsetWidth + dx) + 'px';
      randomPizzaContainerAll[i].style.width = newwidth;
    }
  }
  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
}

window.performance.mark("mark_start_generating");

// This for-loop actually creates and appends all of the pizzas when the page loads
var pizzasDiv = document.getElementById("randomPizzas");
var allPizzas = [];
for (var i = 2; i < NUMBER_OF_PIZZA; i++) {
  pizza = pizzaElementGenerator(i);
  pizza.querySelector("ul").innerHTML = makeRandomPizza();
  pizza.querySelector("h4").innerHTML = randomPizzaName();
  allPizzas.push(pizza);
}

var fullItemList = "";
allPizzas.forEach(function(pizza){
  fullItemList = fullItemList.concat(pizza.outerHTML);
});

// adds string into html without replacing its existing content
pizzasDiv.insertAdjacentHTML( 'beforeend', fullItemList );


// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate 100 pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
// times is the array of User Timing measurements from updatePositions()
function logAverageFrame(times) {
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// Debouncing Scroll Event
// http://www.html5rocks.com/en/tutorials/speed/scrolling/#toc-debouncing
// 1. Cached the last known scroll. 
// 2. 

// caches the latest scroll vertical position of the browser
var latestKnownScrollY = 0;
// ticking ensures rAF runs only on scroll
var ticking = false;

// onScroll runs on the 'scroll' event
// When user scrolls, the scrollY is recorded.
function onScroll() {
  latestKnownScrollY = window.scrollY;
  ticking = true;
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html
// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  requestAnimationFrame(updatePositions);
  ticking = false;

  window.performance.mark("mark_start_frame");
  // TODO: something about saving the scroll position in a variable AKA debouncing scroll events
  // http://www.html5rocks.com/en/tutorials/speed/scrolling/#toc-debouncing
  
  // ORIGINAL
  // var items = document.querySelectorAll('.mover');
  // for (var i = 0; i < items.length; i++) {
  //   var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
  //   items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  // }

  var items = document.querySelectorAll('.mover');
  var itemsLength = items.length;
  var scrollTop = latestKnownScrollY;
  for (var i = 0; i < itemsLength; i++) {
    var phase = Math.sin((scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft +'px';
    items[i].style.transform = "translateX(" + 100 * phase + "px)";
  }

  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    // logAverageFrame(timesToUpdatePosition);
  }
}

// runs onScroll() on scroll
window.addEventListener('scroll', onScroll, false);

document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  var allMovingPizzas = [];
  for (var i = 0; i < 32; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza_bg.png";
    elem.style.height = "100px";
    elem.style.width = "77px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    allMovingPizzas.push(elem);
  }

  allMovingPizzas.forEach(function(elem) {
    document.querySelector("#movingPizzas1").appendChild(elem);
  });  
  updatePositions();
});





// Animation Loops in JavaScript using requestAnimationFrame
// https://www.youtube.com/watch?v=rNsC1VI9388

// http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

// Google I/O 2012 - Jank Busters: Building Performant Web Apps
// Exact example as this project
// heavy css affects painting
// https://www.youtube.com/watch?v=hAzhayTnhEI
