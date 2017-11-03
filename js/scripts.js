ymaps.ready(init);

var myMap,
    myPlacemark;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    renderPoints(myMap);

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        console.log('lat:', coords[0], 'lng:', coords[1]);

        addPoint({
            lat: coords[0],
            lng: coords[1]
        });

        renderPoint(myMap, coords[0], coords[1]);        
    });
};

function getPoints() {
    return localStorage.points ? JSON.parse(localStorage.points) : [];
};

function addPoint(pointObj) {
    console.log('addPoint start');
    var points = getPoints();
    points.push(pointObj);
    localStorage.points = JSON.stringify(points);
};

function renderPoints(myMap) {
    var points = getPoints();

    points.forEach((point) => {
        // console.log('lat:', point.lat, 'lng:', point.lng);
        renderPoint(myMap, point.lat, point.lng);
    });
};

function renderPoint(myMap, lat, lng) {
    var placemark = new ymaps.Placemark([lat, lng]);         
    myMap.geoObjects.add(placemark);

    placemark.events.add('contextmenu', function (e) {
        console.log(e);
    });    
};