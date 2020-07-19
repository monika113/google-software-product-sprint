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

package com.google.sps.data;

/** An item on a todo list. */
public final class User {

  private final boolean isLogin;
  private final String email;
  private final String userId;
  private final String userName;
  private final String loginLink;
  
  public User(boolean isLogin, String email, String userId, String userName, String loginLink) {
    this.isLogin = isLogin;
    this.email = email;
    this.userId = userId;
    this.userName = userName; 
    this.loginLink = loginLink;
  }
}