window.onload = () => {
    let places = dynamicLoadPlaces();
    renderPlaces(places);
};

// to connect this file with html tag
let x = document.getElementById("demo");
// to get gps coords from browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition); //si se está en la ubicación, mostrar el pokémon
    } else {
        x.innerHTML = "Geolocation is not supported by this browser."; //si no se está en la ubicación, no se mostrará el pokémon
    }
}

// to hold coords
let myCoords = {}
// to write coords of html tag
function showPosition(position) {
    // re asign my coords on var
    myCoords.lat = position.coords.latitude
    myCoords.lng = position.coords.longitude
    // wrtite on html
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

//aqí se pasan las coordenadas y se cargan los lugares donde está el usuario
//to pass coords and load places

function dynamicLoadPlaces() {
   return [
       {
           name: 'Magnemite',
           location: {
               lat: myCoords.lat,
               lng: myCoords.lng,
           }
       },
   ];
}
// models data 
let models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];
//to keep model index
let modelIndex = 0;
// to specify the right model to show
let setModel = function (model, entity) { 
    // check if exists scale data
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    // check if exists rotation data
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    // check if exists position data
    if (model.position) {
        entity.setAttribute('position', model.position);
    }
    // pass. model URL
    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};


function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       // coords 
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       // model attribute pass
       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       //to specify the model
       setModel(models[modelIndex], model);
       //extra general data
       model.setAttribute('animation-mixer', '');

       //t listen the click button  
       document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        let entity = document.querySelector('[gps-entity-place]');
        modelIndex++;
        let newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
    });

       scene.appendChild(model);
   });
}