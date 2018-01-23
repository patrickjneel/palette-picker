const generateColor = () => {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  console.log(hex)
  return hex;
}



$("#generate-btn").on('click', () => {
  $(".color").css("background-color", generateColor())
});

$("#color1").css("background-color", generateColor())
$("#color2").css("background-color", generateColor())
$("#color3").css("background-color", generateColor())
$("#color4").css("background-color", generateColor())
$("#color5").css("background-color", generateColor())
