$(document).ready(() => {
  allColors()
});

const generateColor = () => {
  let l = 6;
  let chars = '0123456789ABCDEF';
  let hex = '#';
  while(l--) 
    hex += chars[Math.floor(Math.random() * 16)];
  return hex;
}

const allColors = () => {
  const colors = $('.color')
  colors.each(function() {
    if(!$(this).hasClass('selected')) {
      let color = generateColor()
      $(this).css("background-color", color)
      $(this).find('.hex-value').text(color) 
    }
  }) 
}

const lockColor = (event) => {
   $(event.target).toggleClass('locked').css("display", "flex");
   $(event.target).parents('.color').toggleClass('selected')
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', (event) => lockColor(event));


