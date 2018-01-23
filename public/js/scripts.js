const generateColor = () => {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) 
    hex += chars[Math.floor(Math.random() * 16)];
  return hex;
}

const allColors = () => {
  $("#color1").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
  $("#color2").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
  $("#color3").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
  $("#color4").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
  $("#color5").css("background-color", generateColor).append(`<p class="hex-value">${generateColor()}</p>`)
}

const lockColor = () => {
  console.log('locked')
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', lockColor);


