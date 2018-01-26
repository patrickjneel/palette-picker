$(document).ready(() => {
  allColors()
  fetchProjects()
  fetchPalettes()
});

const generateColor = () => {
  let length = 6;
  let chars = '0123456789ABCDEF';
  let hex = '#';
  while(length--) 
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
    throw err;
   }
}

const fetchPalettes = async () => {
  try {
    const paletteJson = await fetch(`/api/v1/projects/palettes`)
    const paletteData = await paletteJson.json()
    const paletteInfos = paletteData.palette
    palettesReduce(paletteInfos)
  } catch (err) {
    throw err;
  }
}

const palettesReduce = (paletteInfos) => {
   const palettes =  paletteInfos.reduce((accu, project) => {
      if(!accu[project.projectName]) {
        Object.assign(accu, {[project.projectName]: []})
        accu[project.projectName].push(project)
      } else {
        accu[project.projectName].push(project)
      }
      return accu
    }, {})
     addPalette(palettes)
}


const addPalette = (palettes) => {
  const paletteNames= Object.keys(palettes)
    paletteNames.map(project => {
    palettes[project].map((palette, index) => {
      createPalettes(palette, index)
    })
  }) 
}

const createPalettes = (palette, index) =>  {
  // console.log(palette)
    const { projectName, paletteName, id, color1, color2, color3, color4, color5 } = palette;
  $('#projects').append(
    `<article class="project-templates" projectId=${palette.projects_id} paletteId=${id}>
        <span>${projectName}</span>
        <div class="template-color-card">
          <div>${paletteName}</div>
          <div id='${paletteName}-${index}-1'>${color1}</div>
          <div id='${paletteName}-${index}-2'>${color2}</div>
          <div id='${paletteName}-${index}-3'>${color3}</div>
          <div id='${paletteName}-${index}-4'>${color4}</div>
          <div id='${paletteName}-${index}-5'>${color5}</div>
          <img class="trash-can" src="/css/images/garbage.svg" />
        </div>
      </article>`
    )
    $(`#${paletteName}-${index}-1`).css('background-color', color1)
    $(`#${paletteName}-${index}-2`).css('background-color', color2)
    $(`#${paletteName}-${index}-3`).css('background-color', color3)
    $(`#${paletteName}-${index}-4`).css('background-color', color4)
    $(`#${paletteName}-${index}-5`).css('background-color', color5)
    
  }

  const addDomPalette = () => {
    const paletteName = $('#palette-name').val();
    const projectName = $('#select-form').val();
    const color1 = $('.hex1').text()
    const color2 = $('.hex2').text()
    const color3 = $('.hex3').text()
    const color4 = $('.hex4').text()
    const color5 = $('.hex5').text()    
    $('#projects').append(`
      <article class="project-templates">
        <span>${projectName}</span>
        <div class="template-color-card">
          <div>${paletteName}</div>
          <div class='hex1'>${color1}</div>
          <div class='hex2'>${color2}</div>
          <div class='hex3'>${color3}</div>
          <div class='hex4'>${color4}</div>
          <div class='hex5'>${color5}</div>
          <img class="trash-can" src="/css/images/garbage.svg" />
        </div>
      </article>
    `)
      
      $('#palette-name').val('');
  }

const savePalette = () => {
  const paletteName = $('#palette-name').val()
  const projectName = $('#select-form').val();
  const projects_id = $('.project-templates').attr('projectId')
  const palColors = {
    color1: $('.hex1').text(),
    color2: $('.hex2').text(),
    color3: $('.hex3').text(),
    color4: $('.hex4').text(),
    color5: $('.hex5').text()
  }
  const fullPalette = {paletteName, projectName, projects_id, ...palColors}
  postPalette(fullPalette)
}

const postPalette = async (palette) => {
  try {
    const postPalette = await fetch(`/api/v1/projects/${palette.projects_id}/palettes`, {
      method: 'POST',
      body: JSON.stringify({ palette }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      const paletteData = await postPalette.json()
      return paletteData
  } catch (err) {
    return err
  }

}

const deletePalette = (event) => {
  event.target.closest('.trash-can').remove()
}

$("#generate-btn").on('click', allColors);
$(".unlocked").on('click', (event) => lockColor(event));
$("#project-generate-btn").on('click', addProjectName);
$('#save-palette-btn').on('click', savePalette);
$('#save-palette-btn').on('click', addDomPalette)
$(".trash-can").on('click', (event) => deletePalette(event));



