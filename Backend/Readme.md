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

### 4. Get User Notes
 - **Method**: `GET`
 - **Endpoint**: `/notes/all`
  - **Request Body**:
  ***N/A***

 - **Response**:
  ```json
  {
    "success": true,
    "notes": [{
      "_id": "Note ID",
      "title": "Note Title",
      "content": "Note Content",
      "category": "Note Category",
      "priority": "Note Priority",
      "author": "author Id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }]
  }
 ```

### 5. Create User Note
 - **Method**: `POST`
 - **Endpoint**: `/notes/new`
 - **Request Body**:
  
  | Parameter        | Type     | Required    | Description                |
  | :--------------- | :------- | :---------- | :------------------------- |
  | `title`          | `string` | **True**    | New Note Title             |
  | `content`        | `string` | **True**    | New Note Content           |
  | `category`       | `string` | **True**    | Note Category              |
  | `priority`       | `string` | **False**   | Note Priority              |
 
 ***Example***:
 ```json
  {
    "title": "New Note Title",
    "content": "New Note Content",
    "category": "Note Category",
    "priority": "Note Priority",
  }
 ```
 - **Response**:
  ```json
  {
    "success": true,
    "message": "New Note Created Successfully!",
    "newNote": {
      "title": "New Note Title",
      "content": "New Note Content",
      "category": "Note Category",
      "priority": "Note Priority",
      "author": "author Id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
 ```

### 5. Update User Note
 - **Method**: `PATCH`
 - **Endpoint**: `/notes/:noteId`
 - **Request Body**:
  
  | Parameter        | Type     | Required    | Description                |
  | :--------------- | :------- | :---------- | :------------------------- |
  | `title`          | `string` | **False**   | Updated Note Title         |
  | `content`        | `string` | **False**   | Updated Note Content       |
  | `category`       | `string` | **False**   | Updated Note Category      |
  | `priority`       | `string` | **False**   | Updated Note Priority      |
 
 ***Example***:
 ```json
  {
    "title": "Updated Note Title",
    "content": "Updated Note Content",
    "category": "Updated Note Category",
    "priority": "Updated Note Priority",
  }
 ```
 - **Response**:
  ```json
  {
    "success": true,
    "message": "Note Updated Successfully!",
    "newNote": {
      "_id": "Note ID",
      "title": "Updated Note Title",
      "content": "Updated Note Content",
      "category": "Updated Note Category",
      "priority": "Updated Note Priority",
      "author": "author Id",
      "createdAt": "timestamp",
      "updatedAt": "update timestamp"
    }
  }
 ```

### 6. Delete User Note
 - **Method**: `DELETE`
 - **Endpoint**: `/notes/:noteId`
 - **Request Body**:
  ***N/A***

 - **Response**:
  ```json
  {
    "success": true,
    "message": "Note Deletion successful.",
    "deletedNote": {
      "_id": "Deleted Note ID",
      "title": "Deleted Note Title",
      "content": "Deleted Note Content",
      "category": "Deleted Note Category",
      "priority": "Deleted Note Priority",
      "author": "author Id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
 ```