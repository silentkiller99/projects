let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");
let box4 = document.getElementById("box4");

let colors = ["red", "blue", "green", "yellow", "purple"];
let colorIndexBox2 = 0;
let colorIndexBox4 = 0;

alert("Greetings Mr.X ------> Choose The Surprise Boxes");

box1.textContent = "Click Me First";

setInterval(() => {
  box2.style.backgroundColor = colors[colorIndexBox2];
  colorIndexBox2 =
    colorIndexBox2 < 3 ? (colorIndexBox2 += 1) : (colorIndexBox2 = 0);
}, 3000);

box1.addEventListener("click", () => {
  box3.textContent = "Oops something wrong?";

  setInterval(() => {
    box4.style.backgroundColor = colors[colorIndexBox4];
    colorIndexBox4 =
      colorIndexBox4 < colors.length
        ? (colorIndexBox4 += 1)
        : (colorIndexBox4 = 0);
  }, 5000);
});

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 39: // Right arrow key
    case 38: // Up arrow key
      colorIndexBox4 =
        colorIndexBox4 === 0 ? (colorIndexBox4 = 4) : (colorIndexBox4 -= 1);
      box4.style.backgroundColor = colors[colorIndexBox4];
      break;
    case 37: // Left arrow key
    case 40: // Down arrow key
      colorIndexBox4 =
        colorIndexBox4 < colors.length
          ? (colorIndexBox4 += 1)
          : (colorIndexBox4 = 0);
      box4.style.backgroundColor = colors[colorIndexBox4];
      break;
  }
};
