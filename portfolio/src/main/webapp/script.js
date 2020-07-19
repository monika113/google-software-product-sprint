// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Generates a URL for a random image in the images directory and adds an img
 * element with that URL to the page.
 */
function randomizeImage() {

  const imageIndex = Math.floor(Math.random() * 12) + 1;
  const imgUrl = 'images/photo-with-google/' + imageIndex + '.jpeg';

  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('random-image-container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
}

/**
 * Fetches a list of test messages from the server and adds it to the DOM.
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((text) => {
      console.log("fetch comments json: " + text);
    const commentListElement = document.getElementById('comments');
    commentListElement.innerHTML = '';
    text.forEach((line) => {
    commentListElement.appendChild(createCommentElement(line))
    });
  });
}

/** Creates an element containing user name, comment. */
function createCommentElement(line) {
  const liElement = document.createElement('li');
  //liElement.className = 'comment';
  //const userNameElement = document.createElement('span');
  //userNameElement.innerText = line.userName;
  //const textElement = document.createElement('span');
  //textElement.innerText = line.text;
  //const timeElement = document.createElement('span');
  //timeElement.innerText = line.timestamp;

  //liElement.appendChild(userNameElement);
  //liElement.appendChild(textElement);
  //liElement.appendChild(timeElement);
  var name = line.userEmail;
  if (line.userName != null && line.userName != ""){
    name = line.userName;
  }
  liElement.innerHTML = name + ": " + line.text + "<br/>";
  
  if (line.imageUrl != null){
    const imgElement = document.createElement('img');
    imgElement.src = line.imageUrl;
    liElement.appendChild(imgElement);
    liElement.innerHTML += "<br/>" + line.imageLables;
  }
  return liElement;
}

/** check if a user has loged in. if so, show the comments */
function checkLoginStatus() {
  fetch('/login_status').then(response => response.json()).then((text) => {
      console.log("fetch user status json: " + text);

      if (text.isLogin){
          var name = text.email;
          if (text.userName != null && text.userName != ""){
              name = text.userName;
          }
          const loginContainer = document.getElementById('login_status');
          loginContainer.innerHTML = "Welcome, " + name + "\n <a href=\"" + text.loginLink + "\">(log out)</a>.";
          getComments();
          document.getElementById('write_comment').hidden = false;
          document.getElementById('comments').hidden = false;
          document.getElementById('user_nickname').value = text.userName;
      }
      else{
          const loginContainer = document.getElementById('login_status');
          loginContainer.innerHTML = "Hello, Stranger. Please <a href=\"" + text.loginLink + "\">log in</a> to view and write comments.";
          //loginContainer.appendChild(prompt);
          document.getElementById('write_comment').hidden = true;
          document.getElementById('comments').hidden = true;
      }
  });
}

/** Creates a map that shows markers and info windows. */
function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 40.22077, lng: 116.23128}, zoom: 4});

  const marker1 = new google.maps.Marker({
    position: {lat: 40.22077, lng: 116.23128},
    map: map,
    title: 'Beijing'
  });

  const infoWindow1 =
      new google.maps.InfoWindow({content: 'I studied in Beijing for my bachelor and master degree.'});
  infoWindow1.open(map, marker1);

  const marker2 = new google.maps.Marker({
    position: {lat: 30.2084, lng: 120.21201},
    map: map,
    title: 'Hangzhou'
  });

  const infoWindow2 =
      new google.maps.InfoWindow({content: 'Hangzhou is my hometown.'});
  infoWindow2.open(map, marker2);

  const marker3 = new google.maps.Marker({
    position: {lat: 23.697809, lng: 120.960518},
    map: map,
    title: 'Taiwan'
  });

  const infoWindow3 =
      new google.maps.InfoWindow({content: 'I traveled to Taiwan with my friend Joe in 2018.'});
  infoWindow3.open(map, marker3);

  const marker4 = new google.maps.Marker({
    position: {lat: 4.210484, lng: 101.975769},
    map: map,
    title: 'Malaysia'
  });

  const infoWindow4 =
      new google.maps.InfoWindow({content: 'I visited Malaysia for my graduation trip in 2019, where I tried deep diving for the first time.'});
  infoWindow4.open(map, marker4);

  const marker5 = new google.maps.Marker({
    position: {lat: 50.3, lng: 108},
    map: map,
    title: 'Baikal'
  });

  const infoWindow5 =
      new google.maps.InfoWindow({content: 'It is the first time I took my mother on a trip abroad, to Baikal Lake, Russia. I will do it again.'});
  infoWindow5.open(map, marker5);

  const marker6 = new google.maps.Marker({
    position: {lat: 30.572815, lng: 104.066803},
    map: map,
    title: 'Chengdu'
  });

  const infoWindow6 =
      new google.maps.InfoWindow({content: 'Pandas are so cute!!! But food is too spicy for me.'});
  infoWindow6.open(map, marker6);

}