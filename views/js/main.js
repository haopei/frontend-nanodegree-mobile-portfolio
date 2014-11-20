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

// Ingredients
var pizzaIngredients = {};
pizzaIngredients.meats=["Pepperoni","Sausage","Fennel Sausage","Spicy Sausage","Chicken","BBQ Chicken","Chorizo","Chicken Andouille","Salami","Tofu","Bacon","Canadian Bacon","Proscuitto","Italian Sausage","Ground Beef","Anchovies","Turkey","Ham","Venison","Lamb","Duck","Soylent Green","Carne Asada","Soppressata Picante","Coppa","Pancetta","Bresola","Lox","Guanciale","Chili","Beef Jerky","Pastrami","Kielbasa","Scallops","Filet Mignon"];
pizzaIngredients.nonMeats=["White Onions","Red Onions","Sauteed Onions","Green Peppers","Red Peppers","Banana Peppers","Ghost Peppers","Habanero Peppers","Jalapeno Peppers","Stuffed Peppers","Spinach","Tomatoes","Pineapple","Pear Slices","Apple Slices","Mushrooms","Arugula","Basil","Fennel","Rosemary","Cilantro","Avocado","Guacamole","Salsa","Swiss Chard","Kale","Sun Dried Tomatoes","Walnuts","Artichoke","Asparagus","Caramelized Onions","Mango","Garlic","Olives","Cauliflower","Polenta","Fried Egg","Zucchini","Hummus"];
pizzaIngredients.cheeses=["American Cheese","Swiss Cheese","Goat Cheese","Mozzarella Cheese","Parmesean Cheese","Velveeta Cheese","Gouda Cheese","Muenster Cheese","Applewood Cheese","Asiago Cheese","Bleu Cheese","Boursin Cheese","Brie Cheese","Cheddar Cheese","Chevre Cheese","Havarti Cheese","Jack Cheese","Pepper Jack Cheese","Gruyere Cheese","Limberger Cheese","Manchego Cheese","Marscapone Cheese","Pecorino Cheese","Provolone Cheese","Queso Cheese","Roquefort Cheese","Romano Cheese","Ricotta Cheese","Smoked Gouda"];
pizzaIngredients.sauces=["Red Sauce","Marinara","BBQ Sauce","No Sauce","Hot Sauce"];
pizzaIngredients.crusts=["White Crust","Whole Wheat Crust","Flatbread Crust","Stuffed Crust"];

// Adjectives
var pizzaAdjs = {};
pizzaAdjs.dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted", "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty", "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
pizzaAdjs.colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red", "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta","chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan", "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
pizzaAdjs.whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing", "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy", "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked", "brainwashed"];
pizzaAdjs.shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise", "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy", "metallic"];
pizzaAdjs.noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic", "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling", "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping", "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
pizzaAdjs.apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic", "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying", "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
pizzaAdjs.insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow", "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous", "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless", "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed", "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide", "horrible", "syncophantic", "unhelpful", "bootlicking"];
pizzaAdjs.praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful", "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous", "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave", "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome", "majestic", "grand", "stunning"];
pizzaAdjs.scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological", "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar", "extinct", "galactic"]

// Nouns
var pizzaNouns = {};
pizzaNouns.animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo", "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan", "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper", "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale", "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish", "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture", "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
pizzaNouns.professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic","comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor", "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot","priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
pizzaNouns.fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost", "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester", "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
pizzaNouns.music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums", "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone","bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor","singer"];
pizzaNouns.horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf", "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter", "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath","fiend", "satanist", "moon", "fullMoon"];
pizzaNouns.gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm", "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance", "fluid", "moisture", "garbage", "trash", "bug"];
pizzaNouns.everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV","book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen","garden", "school", "wallet", "bottle"];
pizzaNouns.jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry", "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin","costume", "ornament", "treasure"];
pizzaNouns.places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood","city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery","shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
pizzaNouns.scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy", "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars","quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus","universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];

var adjectives = ["dark", "colors", "whimsy", "shiny", "noisy", "apocalyptic", "insulting", "praise", "scientific"];
var nouns = ["animals", "everyday", "fantasy", "gross", "professions", "horror", "jewelry", "places", "scifi"];

var NUMBER_OF_PIZZA = 100,
    ADJ_LENGTH = adjectives.length,
    NOUN_LENGTH = nouns.length,
    MEAT_LENGTH = pizzaIngredients.meats.length,
    NONMEAT_LENGTH = pizzaIngredients.nonMeats.length,
    CHEESES_LENGTH = pizzaIngredients.cheeses.length,
    SAUCES_LENGTH = pizzaIngredients.sauces.length,
    CRUSTS_LENGTH = pizzaIngredients.crusts.length;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function getAdj(key) {
  return pizzaAdjs[key];
};

function getNoun(key) {
  return pizzaNouns[key];
};

function randomNumber(range) {
  return Math.floor(Math.random() * range);
}

function pizzaNameGenerator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = randomNumber(ADJ_LENGTH);
  var randomNoun = randomNumber(NOUN_LENGTH);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
};

function randomPizzaName() {
  var randomNumberAdj = randomNumber(ADJ_LENGTH);
  var randomNumberNoun = randomNumber(NOUN_LENGTH);
  return pizzaNameGenerator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
};

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
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
var makeRandomPizzaIngredients = function() {
  var pizza = "";
  var numberOfMeats = randomNumber(4);
  var numberOfNonMeats = randomNumber(3);
  var numberOfCheeses = randomNumber(2);

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
// TODO: initial load spends 47ms on evaluating this script's functions:
// randomPizzaName() and makeRandomPizzaIngredients()
var pizzaElementGenerator = function(i) {
  var pizzaContainer,
      pizzaImageContainer,
      pizzaImage,
      pizzaDescriptionContainer,
      pizzaName,
      ul;

  pizzaContainer  = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;
  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImage.setAttribute("width", "232");
  pizzaImage.setAttribute("height", "300");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);

  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomPizzaName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizzaIngredients();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
}

// ORIGINAL PIZZARESIZE CODE GOES HERE; MOVED TO resizer.js

window.performance.mark("mark_start_generating");

var pizzasDiv = document.getElementById("randomPizzas");
var allPizzas = [];
for (var i = 2; i < NUMBER_OF_PIZZA; i++) {
  pizza = pizzaElementGenerator(i);
  pizzasDiv.appendChild(pizza);
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate 100 pizzas on load: " + timeToGenerate[0].duration + "ms");

function logAverageFrame(times) {
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

var latestKnownScrollY = 0;
var ticking = false;

function onScroll() {
  latestKnownScrollY = window.scrollY;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updatePositions);
  }
  ticking = true;
}
var frame = 0;
function updatePositions() {
  frame++;
  ticking = false;
  window.performance.mark("mark_start_frame"); 
  var items = document.querySelectorAll('.mover');
  var itemsLength = items.length;
  var scrollTop = latestKnownScrollY;
  for (var i = 0; i < itemsLength; i++) {
    var phase = Math.sin((scrollTop / 1250) + (i % 5));
    // items[i].style.left = items[i].basicLeft +'px';
    items[i].style.transform = "translateX(" + 100 * phase + "px)";
  }

  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

window.addEventListener('scroll', onScroll, false);

document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  var allMovingPizzas = [];
  for (var i = 0; i < 32; i++) {
    var elem = document.createElement('img');
    elem.classList.add('mover');
    elem.src = "images/pizza_bg.png";
    elem.setAttribute("height", "100");
    elem.setAttribute("width", "77");
    elem.basicLeft = (i % cols) * s;
    elem.style.left = elem.basicLeft + "px";
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    allMovingPizzas.push(elem);
  }

  allMovingPizzas.forEach(function(elem) {
    document.querySelector("#movingPizzas1").appendChild(elem);
  });  
  updatePositions();
});

// Handles onsubmit for contact button
document.getElementById('contact').addEventListener('submit', function() {
  alert('Thanks for clicking! This button doesn\'t do anything because this is a fake pizzeria :\)');
});

// Listens for pizza resizing calls
var resizerInput = document.getElementById('sizeSlider');
resizerInput.addEventListener('change', function() {
  resizePizzas(resizerInput.value);
});
