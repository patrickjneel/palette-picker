

const generateColor = () => {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) 
    hex += chars[Math.floor(Math.random() * 16)];
  return hex;
}

const allColors = () => {
  const color1 = generateColor()
  const color2 = generateColor()
  const color3 = generateColor()
  const color4 = generateColor()
  const color5 = generateColor()

  $("#color1").css("background-color", color1)
  $(".hex1").text(color1);
  $("#color2").css("background-color", color2)
  $(".hex2").text(color2);
  $("#color3").css("background-color", color3)
  $(".hex3").text(color3);
  $("#color4").css("background-color", color4)
  $(".hex4").text(color4);
  $("#color5").css("background-color", color5)
  $(".hex5").text(color5);
}

const lockColor = (event) => {
  $(event.target).toggleClass('locked').css("display", "flex")
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', (event) => lockColor(event));

$(document).ready(() => {
  allColors()
});

