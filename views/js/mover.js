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
  requestTick();
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html
// Moves the sliding background pizzas based on scroll position

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updatePositions);
  }
  ticking = true;
}

function updatePositions() {
  frame++;
  ticking = false;
  window.performance.mark("mark_start_frame"); 
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
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs onScroll() on scroll
window.addEventListener('scroll', onScroll, false);

document.addEventListener('DOMContentLoaded', function() {
  console.log("com loaded");
  var cols = 8;
  var s = 256;
  var allMovingPizzas = [];
  for (var i = 0; i < 32; i++) {
    var elem = document.createElement('img');
    // elem.className = 'mover';
    elem.classList.add('mover');
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