// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) { 
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider

  function changeSliderLabel(size) {
    var pizzaSizeDiv = document.querySelector("#pizzaSize");
    switch(size) {
      case "1":
        pizzaSizeDiv.innerHTML = "Small";
        return;
      case "2":
        pizzaSizeDiv.innerHTML = "Medium";
        return;
      case "3":
        pizzaSizeDiv.innerHTML = "Large";
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
    var dx = determineDx(randomPizzaContainerAll[0], size);
    var newwidth = (randomPizzaContainerAll[0].offsetWidth + dx) + 'px';
    for (var i = 0; i < pizzaContainerLength; i++) {
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
