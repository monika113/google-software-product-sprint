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
      console.log("fetch json: " + text);
    const commentListElement = document.getElementById('comments')
    commentListElement.innerText = '';
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
  liElement.innerText = line.userName + ": " + line.text;
  return liElement;
}