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

const addProjectName = () => {
  let projectName = $('#palette-name-input').val();
  $('#select-form').append(`<option>${projectName}</option>`)
   $('#palette-name-input').val('')
}
  // $('.project-templates').append(`
  //   <article class="project-templates">
  //       <span>Corgi Counter</span>
  //       <div class="template-color-card">
  //         <div>Trash 1</div>
  //         <div class="temp-color"></div>
  //         <div class="temp-color"></div>
  //         <div class="temp-color"></div>
  //         <div class="temp-color"></div>
  //         <div class="temp-color"></div>
  //         <img class="trash-can" src="/css/images/garbage.svg" />
  //       </div>
  //     </article>`
  

// function fetchProjects() {
//   console.log('hi')
//   // const projectJson = await fetch('localhost:3000/api/v1/projects')
//   // const projectData = await projectJson.json()
//   // console.log(projectData)
// }

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', (event) => lockColor(event));
$("#project-generate-btn").on('click', addProjectName);



