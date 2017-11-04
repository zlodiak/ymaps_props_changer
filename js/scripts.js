ymaps.ready(init);

var myMap,
    myCollection,
    myPlacemark;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    myCollection = new ymaps.GeoObjectCollection ({},
      { geoObjectDraggable: true }
    );

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        console.log('lat:', coords[0], 'lng:', coords[1]);
 
        var placemark = new ymaps.Placemark([coords[0], coords[1]]);  
        this.myCollection.add(placemark);       
        myMap.geoObjects.add(this.myCollection);
        console.log(this.myCollection);              
          
        addPoint();            
    });
};

function getPoints() {
    return localStorage.points ? JSON.parse(localStorage.points) : [];
};

function addPoint() {
    console.log(myCollection);
    var points = getPoints();
    localStorage.points = JSON.stringify(myCollection);
};
