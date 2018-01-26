
exports.seed = function(knex, Promise) {
  
  return knex('palette').del()
    .then(() => knex('projects').del())

    .then(function () {

      return Promise.all([
        knex('projects').insert({
          projectName: 'Project1'
        }, 'id')
        .then(palettes => {
          return knex('palette').insert([
            {
              projectName: 'Project1', 
              paletteName: 'Fall', 
              color1: '#FF', 
              color2: '#FF',
              color3: '#FF', 
              color4: '#FF', 
              color5: '#FF',
              projects_id: palettes[0]
            },
            {
              projectName: 'Project1', 
              paletteName: 'Spring', 
              color1: '#FF', 
              color2: '#FF',
              color3: '#FF', 
              color4: '#FF', 
              color5: '#FF',
              projects_id: palettes[0]
            }
          ])
        })
        .then(() => console.log('seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) //end Promise.all
    });
};
