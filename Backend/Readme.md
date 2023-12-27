# WebBOOK API Documentation

## Overview

Welcome to the API documentation for WebBOOK, a secure note-taking MERN application. This documentation provides details on the available endpoints, request and response formats, and authentication requirements.

## Base URL

```
  http://localhost:5000/api/v1
```

## Authentication

WebBOOK API uses JWT (JSON Web Tokens) for authentication. It uses secure and http only cookies, so your frontend doesn't have to do anything extra fancy!

## Endpoints
 ### 1. User Registration
 - **Method**: `POST`
 - **Endpoint**: `/user/register`
 - **Request Body**:
  
  | Parameter        | Type     | Required    | Description                |
  | :--------------- | :------- | :---------- | :------------------------- |
  | `username`       | `string` | **True**    | Unique Username            |
  | `firstName`      | `string` | **True**    | First Name of User         |
  | `lastName`       | `string` | **True**    | Last Name of User          |
  | `email`          | `string` | **True**    | Unique User Email ID       |
  | `password`       | `string` | **True**    | Strong User Password       |
  | `countryCode`    | `number` | **True**    | User Mobile Country Code   |
  | `mobile`         | `number` | **False**   | Unique User Mobile No      |
  | `profilePicture` | `string` | **False**   | User Profile Picture       |
 
 ***Example***:
 ```json
  {
    "username": "example_user",
    "firstName":"John",
    "lastName" : "Doe",
    "email": "user@example.com",
    "password": "user_password",
    "countryCode": 91,
    "mobile": 9876543210,
  }
 ```
 - **Response**:
  ```json
  {
    "success": true,
    "message": "New User Created Successfully!"
  }
 ```

 ### 2. User Login
 - **Method**: `POST`
 - **Endpoint**: `/user/login`
 - **Request Body**:
  
  | Parameter        | Type     | Required    | Description                |
  | :--------------- | :------- | :---------- | :------------------------- |
  | `email`          | `string` | **True**    | Registered User Email ID   |
  | `password`       | `string` | **True**    | Registered User Password   |
 
 ***Example***:
 ```json
  {
    "email": "user@example.com",
    "password": "user_password",
  }
 ```
 - **Response**:
  ```json
  {
    "success": true,
    "message": "Logged In Successfully!",
    "userData": {
      "username": "example_user",
      "firstName":"John",
      "lastName" : "Doe",
      "email": "user@example.com",
      "role": "User",
      "profilePicture": "",
      "staredNotes": []
    }
  }
 ```

### 3. User Logout
 - **Method**: `POST`
 - **Endpoint**: `/user/logout`
 - **Request Body**:
  ***N/A***

 - **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
 ```