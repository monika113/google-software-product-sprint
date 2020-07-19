<%--
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--%>

<%-- The Java code in this JSP file runs on the server when the user navigates
     to the homepage. This allows us to insert the Blobstore upload URL into the
     form without building the HTML using print statements in a servlet. --%>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/data"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body onload="checkLoginStatus()">
    <div id="content">
      <h1>Lingyu's Portfolio</h1>
      <p>Hello, I am Lingyu Sun. I am now a master student in Tsinghua University. I studied math when I was undergraduate and then switched to statistics. But I really love coding! I hope I can make new friends in SPS :)</p>
      <img src="images/image_Selfie.jpeg" width="80%" align="middle"/>
      <p> If you want to know more about me ~</p>
      <ul>
      <li><p><a href="https://github.com/monika113" target="_blank">My Github</a></p></li>
      <li><p>Click <a href="experiences.html">here</a> to see more about my experiences</p></li>
      <li><p>Click <a href="photo_with_google.html">here</a> to see some photos I took with Google before</p></li>
      </ul>
      <hr />
      <p id="login_status"></p>
      <form id="write_comment" action="<%= uploadUrl %>" enctype="multipart/form-data"  method="POST" hidden>
        <p>Your name: <input type="text" name="name" id="user_nickname" value="" > </p>
        <p>Please write your comment here:</p>
        <textarea name="comment" style="width:100%; height:100px;"></textarea>
        <br/><br/>
        <p>Upload an image: <input type="file" name="image"></p>
        <input type="submit" value="Submit"/>
      </form>
      <p> Previous Comments:</p>
      <ul id="comments" hidden></ul>
    </div>
  </body>
</html>
