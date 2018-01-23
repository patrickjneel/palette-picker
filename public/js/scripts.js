const generateColor = () => {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) 
    hex += chars[Math.floor(Math.random() * 16)];
  return hex;
}

const allColors = () => {
  $("#color1").css("background-color", generateColor).text(generateColor)
  $("#color2").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
  $("#color3").css("background-color", generateColor)
  $("#color4").css("background-color", generateColor)
  $("#color5").css("background-color", generateColor)
}

const lockColor = () => {
  console.log('locked')
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', lockColor);


