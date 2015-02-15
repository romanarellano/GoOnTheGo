/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        mapLoad();
        google.maps.event.addDomListener(window, 'load', this.initialize);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }
};


function getWindowWidth() { // Assumes current window to be used
  return _getWindowWidth(window);
}
//-----------------------------------------------------------------------------
 
function _getWindowWidth(win) {
  if (parseInt(navigator.appVersion) > 3) {
    if (navigator.appName=="Netscape") 
      return win.innerWidth;
  }
  if (navigator.appName.indexOf("Microsoft")!= -1) {
    //--- NOTE: IE may not have a document and document.body object before the onLoad event ---
    if (win.document && win.document.body)
      return win.document.body.offsetWidth;
  }
  return 1024; // default width
}
//-----------------------------------------------------------------------------
 
function getWindowHeight() { // Assumes current window to be used
  return _getWindowHeight(window);
}
//-----------------------------------------------------------------------------
 
function _getWindowHeight(win) {
   if (window.innerHeight) {
    return window.innerHeight;
  }
  else if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }
  else if (document.body) {
    return document.body.clientHeight;
  }
  
  return 768; // default height
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------

function Restroom() {
  this.id = 0;
  this.name = '';
  this.lat = 0;
  this.lon = 0;
  this.locDetail = '';
  this.accesPublic = true;
  this.accesCustomer = false;
  this.family = false;
  this.timestamp = new Date();
  this.user = ''; // need to get current user id/name
}
//-----------------------------------------------------------------------------

function Review() {
  this.id = 0;
  this.idRestroom = 0;
  this.rating = 3;
  this.remarks = '';
  this.timestamp = new Date();
  this.user = ''; // need to get current user id/name
}
//-----------------------------------------------------------------------------

function User() {
  this.id = 0;
  this.name = 0;
  this.timestamp = new Date();
}
//-----------------------------------------------------------------------------

var map = null;

function mapLoad() {
  var myLatlng = new google.maps.LatLng(21.291633588436564, -157.84459948539734);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'You are here'
  });
}
//-----------------------------------------------------------------------------

var shape = {
coord: [1, 1, 1, 20, 18, 20, 18 , 1],
    type: 'poly'
 };

function plotRestroom(restroom) {
  //alert("plotRestroom()\nrestroom.id = " + restroom.id);
  var str = restroom.name;
  if (restroom.locDetail != '')
    str += " - " + restroom.locDetail;
  var myLatlng = new google.maps.LatLng(restroom.lat, restroom.lon);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: str
      
  });
}  
//-----------------------------------------------------------------------------

function plotRestrooms() {
  //alert("plotRestrooms()\naRestroom.length = " + aRestroom.length);
  for (var i = 0; i < aRestroom.length; i++) {
    plotRestroom(aRestroom[i]);
  }
}
//-----------------------------------------------------------------------------

var aRestroom = new Array();

// dummy test records
var restroom = new Restroom();
restroom.id = 1;
restroom.name = "Macy's";
restroom.locDetail = "3rd floor";
restroom.lat = 21.290352727863862;
restroom.lon = -157.8416557610035;
aRestroom[0] = restroom;

// dummy test records
restroom = new Restroom();
restroom.id = 2;
restroom.name = "WalMart";
restroom.lat = 21.294803078971693;
restroom.lon = -157.84295797348022;
aRestroom[1] = restroom;

//-----------------------------------------------------------------------------

function x_mapLoad() {
  if (!GBrowserIsCompatible())
    return;

  origMap = new GMap2(document.getElementById("map"));
  origMap.addControl(new GSmallMapControl());
  origMap.addControl(new GMapTypeControl());
  GEvent.addListener(origMap, "moveend", function() {
    var center = origMap.getCenter();
    //document.getElementById("origMessage").innerHTML = center.toString();
    //setLocation("orig", center.toString());
    //showDistance();
  });
  origMap.setCenter(new GLatLng(21.321999913, -157.9236602783203), 10);
 }
//-----------------------------------------------------------------------------

function setLocation (origDest, latLon) {
  var arrayLL = latLon.split(",");
  var lat = arrayLL[0];
  var lon = arrayLL[1];
  if (lat[0] == "(")
    lat = lat.substring(1);
  if (lon[lon.length-1] == ")")
    lon = lon.substring(0,lon.length-1);
  if (lon[0] == ' ')
    lon = lon.substring(1);

  var nameObj = document.getElementById(origDest + "Name");
  if (!nameObj)
    return;

  var latObj = document.getElementById(origDest + "Lat");
  if (!latObj)
    return;
  if (latObj.value != lat) {
    latObj.value = lat;
        //alert("clearing " + nameObj.id + ".value");
    nameObj.value = "";
  }

  var lonObj = document.getElementById(origDest + "Lon");
  if (!lonObj)
    return;
  if (lonObj.value != lon) {
    lonObj.value = lon;
    nameObj.value = "";
  }
}
//-----------------------------------------------------------------------------

function filterCheck() {
  var filterPublic = document.getElementById('public');
  var filterCustomer = document.getElementById('customer');
  if (!filterPublic.checked && !filterCustomer.checked) {
    filterPublic.checked = true;
    alert("Either Public or Customer Only must be selected.");
  }
}
//-----------------------------------------------------------------------------

var minStars = 3; // initial value (medium)

function plot() {
  var str = 'Displaying only ' + minStars + ' star and above restrooms.';
  var filterPublic = document.getElementById('public');
  if (filterPublic.checked)
    str += "\nIncluding Public Restrooms.";
  var filterCustomer = document.getElementById('customer');
  if (filterCustomer.checked)
    str += "\nIncluding Customer Only Restrooms.";
  var filterFamily = document.getElementById('family');
  if (filterFamily.checked)
    str += "\nIncluding Family Friendly Restrooms.";
  //alert (str);      

  plotRestrooms(); // plot using filters (redraw pins on map)   
}
//-----------------------------------------------------------------------------

function rating(stars) {
  minStars = stars;
  var star1 = document.getElementById('star1');
  var star2 = document.getElementById('star2');
  var star3 = document.getElementById('star3');
  var star4 = document.getElementById('star4');
  var star5 = document.getElementById('star5');
  switch (stars) {
    case 5: 
      star2.src = 'img/StarBlue.jpg';
      star3.src = 'img/StarBlue.jpg';
      star4.src = 'img/StarBlue.jpg';
      star5.src = 'img/StarBlue.jpg';
      break;
    case 4: 
      star2.src = 'img/StarBlue.jpg';
      star3.src = 'img/StarBlue.jpg';
      star4.src = 'img/StarBlue.jpg';
      star5.src = 'img/StarGray.jpg';
      break;
    case 3: 
      star2.src = 'img/StarBlue.jpg';
      star3.src = 'img/StarBlue.jpg';
      star4.src = 'img/StarGray.jpg';
      star5.src = 'img/StarGray.jpg';
      break;
    case 2: 
      star2.src = 'img/StarBlue.jpg';
      star3.src = 'img/StarGray.jpg';
      star4.src = 'img/StarGray.jpg';
      star5.src = 'img/StarGray.jpg';
      break;
    case 1: 
      star2.src = 'img/StarGray.jpg';
      star3.src = 'img/StarGray.jpg';
      star4.src = 'img/StarGray.jpg';
      star5.src = 'img/StarGray.jpg';
      break;
    default: ;
  }
  plot();
}
//-----------------------------------------------------------------------------

function addRestroom() {
  //alert("Add restroom pop-up window should appear.\nscreen.width=" + screen.width);
  var divAdd = document.getElementById('divAdd');
  var width = 380; 
  divAdd.style.width = width + 'px';
  divAdd.style.opacity = 0.90;
  var left = (getWindowWidth() - width) / 2;
  if (left < 0)
    left = 0;
  divAdd.style.left = left + 'px';    
  divAdd.style.display = ''; // make visible
}
//-----------------------------------------------------------------------------

function hideAddReview() {
  var divAddReview = document.getElementById('divAddReview');
  divAddReview.style.display = 'none'; // hide input fields
}
//-----------------------------------------------------------------------------

function insertReview(id) {
  var review = new Review();
  review.idRestroom = id;
  // input field to review object fields
  // insert review record into database
  alert("Insert review record into database.");
}
//-----------------------------------------------------------------------------

function updateRestroom(id) {
  // input fields to restroom object fields
  // update restroom record in database 
  
  hideAddReview(); 

  // input fields to review object fields
  insertReview(id);
  //alert("Insert new Review record (possibly update Restroom record) and re-plot map");
}  
//-----------------------------------------------------------------------------

function hideAddRestroom() {
  var divAdd = document.getElementById('divAdd');
  divAdd.style.display = 'none'; // hide input fields
}
//-----------------------------------------------------------------------------

function insertRestroom() {
  hideAddRestroom(); 
  var restroom = new Restroom();
  // input fields to restroom object fields
  // insert restroom record into database - get returned ID value
  alert("Insert restroom record into database.");

  insertReview(restroom.id);
  // call plot() again (to display new data)
  alert("Re-plot map");
}