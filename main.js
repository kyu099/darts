let map;
let centerplace;
let markers = [];
let circle = null;
let rad;
let count = 0;

let MyLatLng = new google.maps.LatLng(35.6518205, 139.5446124);
let Options = {
    zoom: 15,
    center: MyLatLng,
    mapTypeId: "roadmap",
};

map = new google.maps.Map(document.getElementById("map"), Options);

document.getElementById("search").onclick = () =>{
    deleteCircles();
    deleteMakers();

    const place = document.getElementById("keyword").value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address: place
    },function(results,status){
        if(status == google.maps.GeocoderStatus.OK) {

            for(let i in results) {
                if(results[0].geometry){
                    let latlng = results[0].geometry.location; //緯度経度
                    map.setCenter(latlng); //中心に移動
                    setMarker(latlng);
                    centerplace = latlng;
                    console.log(latlng.lat(), latlng.lng());
                }
            }
        }
    })
}

document.getElementById("draw").onclick = () => {
    deleteCircles();
    if(markers == null) {alert("中心を指定してください")};
    rad = document.getElementById("rad").value;
    if(rad <= 0){alert("正の値を入力してください");}
    else {setCircle(centerplace, parseFloat(rad));}
}

document.getElementById("darts").onclick　= () => {
    if(marker == null){alert("中心を指定してください")}
    if(circle == null){alert("範囲を指定してください")}
    else {
        while(1){
            let lat = centerplace.lat() + 2 * (Math.random() - 0.5)* 360 * rad / 40000000;
            let lng = centerplace.lng() + 2 * (Math.random() - 0.5)* 360 * rad / (40000000 * Math.cos(centerplace.lat() * Math.PI / 180));
            let newplace = new google.maps.LatLng(lat, lng);
            if(check(lat, lng, centerplace.lat(), centerplace.lng())) {
                setDarts(newplace);
                break;
            }
        }
        
    }
}

document.getElementById("reset").onclick = () => {
    deleteCircles();
    deleteMakers();
}

function setMarker(setplace){
    let iconUrl = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    let marker = new google.maps.Marker({
      position: setplace,
      map: map,
      icon: iconUrl
    });
    markers.push(marker);
}

function deleteMakers() {
    for(let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    marker = [];
}

function setCircle(setplace, rad){
    circle = new google.maps.Circle({
        center: setplace,
        map: map,
        radius: rad
    });
}

function deleteCircles() {
    if(circle != null){
        circle.setMap(null);
    }
    circle = null;
}

function check(a, b, c, d){
    let x = Math.cos(a * Math.PI / 180) * Math.cos(b * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.cos(d * Math.PI / 180)
          + Math.cos(a * Math.PI / 180) * Math.sin(b * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(d * Math.PI / 180)
          + Math.sin(a * Math.PI / 180) * Math.sin(c * Math.PI / 180);

    if(40000000 * Math.acos(x) / (2 * Math.PI) < rad) return 1;
    else return 0;
}

function setDarts(setplace){
    let iconUrl = 'darts_ya.png';
    let marker = new google.maps.Marker({
      position: setplace,
      map: map,
      icon: iconUrl
    });
    markers.push(marker);
}
