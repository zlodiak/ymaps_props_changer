ymaps.ready(init);

var myMap,
    collectionMarkers,
    myPlacemark;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    collectionMarkers = new ymaps.GeoObjectCollection({}, {
        preset: "islands#redIcon"
    });

    myMap.geoObjects.add(collectionMarkers);

    renderSavedPoints();

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        console.log('lat:', coords[0], 'lng:', coords[1]);

        var placemark = new ymaps.Placemark([coords[0], coords[1]]); 
        addRightClickEvent(placemark);   
        collectionMarkers.add(placemark);  

        addToStoragePoint({
            lat: coords[0],
            lng: coords[1]
        });       
    });
};

function getPoints() {
    return localStorage.points ? JSON.parse(localStorage.points) : [];
};

function addToStoragePoint(pointObj) {
    console.log('addToStoragePoint start');
    var points = getPoints();
    points.push(pointObj);
    localStorage.points = JSON.stringify(points);
};

function renderSavedPoints() {
    console.log('renderSavedPoints start', collectionMarkers);
    var points = getPoints();

    points.forEach((point) => {        
        // console.log('lat:', point.lat, 'lng:', point.lng);
        var placemark = new ymaps.Placemark([point.lat, point.lng]);    
        addRightClickEvent(placemark);     
        collectionMarkers.add(placemark);
    });
};

function addRightClickEvent(placemark) {
    placemark.events.add('contextmenu', function (e) {
        var pointLat = e.get('coords')[0],
            pointLng = e.get('coords')[1];

        console.log('right click', e.get('coords'), pointLat, pointLng);        
        var points = getPoints(),
            newPoints = [];

        points.forEach((point) => {        
            console.log('lat:', point.lat, 'lng:', point.lng);
            if(point.lat != pointLat && point.lng != pointLng ) {
                console.log('add!!');
                newPoints.push(point);
            } else {
                console.log('del!!');
            }
        }); 

        localStorage.points = JSON.stringify(newPoints);     


    });     
};

