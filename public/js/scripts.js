$(document).ready(() => {
  allColors()
  fetchProjects()
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
   postProject(projectName)
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
  

const fetchProjects = async () => {
  const projectJson = await fetch('/api/v1/projects')
  const projectData = await projectJson.json()
  const projects = projectData.projects
  projects.forEach(name => {
    $('#select-form').append(`<option>${name.projectName}</option>`)
  }) 
}

const postProject = async (projectName) => {
  try {
  const postProject = await fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({projectName}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
   const projectData = await postProject.json()
      return projectData
  } catch (err) {
   }
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', (event) => lockColor(event));
$("#project-generate-btn").on('click', addProjectName);



