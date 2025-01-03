# User Registration API Documentation

## Endpoint
`POST /user/register`

### Description
This endpoint allows a new user to register by providing their email, first name, last name, and password. Upon successful registration, a JSON Web Token (JWT) is returned for authentication.

### Request Body
The request body must be in JSON format and include the following fields:

{
"fullname": {
"firstname": "string (at least 3 characters)",
"lastname": "string (optional, at least 3 characters)"
},
"email": "string (valid email format)",
"password": "string (at least 6 characters)"
}


### Responses

#### Success
- **Status Code:** `201 Created`
- **Response Body:**

{
"token": "string (JWT token)",
"user": {
"fullname": {
"firstname": "string",
"lastname": "string"
},
"email": "string",
"scoketId": "string (optional)"
}
}


#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Response Body:**
  {
"errors": [
{
"msg": "Invalid email",
"param": "email",
"location": "body"
},
{
"msg": "First name must be 3 characters long.",
"param": "fullname.firstname",
"location": "body"
},
{
"msg": "Password must be 6 characters long.",
"param": "password",
"location": "body"
}
]
}


### Notes
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database for security.

# User Login API Documentation

## Endpoint
`POST /user/login`

### Description
This endpoint allows an existing user to log in by providing their email and password. Upon successful login, a JSON Web Token (JWT) is returned for authentication.

### Request Body
The request body must be in JSON format and include the following fields:
{
"email": "string (valid email format)",
"password": "string (at least 6 characters)"
}

### Responses

#### Success
- **Status Code:** `200 OK`
- **Response Body:**

{
"token": "string (JWT token)",
"user": {
"fullname": {
"firstname": "string",
"lastname": "string"
},
"email": "string",
"scoketId": "string (optional)"
}
}


#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Response Body:**
  {
"errors": [
{
"msg": "Invalid email",
"param": "email",
"location": "body"
},
{
"msg": "Password must be 6 characters long.",
"param": "password",
"location": "body"
}
]
}

- **Status Code:** `401 Unauthorized`
  - **Response Body:**
  {
"message": "Invalid email or password"
}

- **Status Code:** `401 Unauthorized`
  - **Response Body:**

  {
"message": "Email and password do not match"
}


### Notes
- Ensure that the email provided is registered in the system.
- Passwords are compared securely to prevent unauthorized access.

# User Profile and Logout API Documentation

## Endpoint
### Get User Profile
`GET /user/profile`

#### Description
This endpoint retrieves the profile information of the currently authenticated user. The user must be logged in and provide a valid JWT token for authentication.

#### Responses

##### Success
- **Status Code:** `200 OK`
- **Response Body:**
{
"fullname": {
"firstname": "string",
"lastname": "string"
},
"email": "string",
"scoketId": "string (optional)"
}

##### Error Responses
- **Status Code:** `401 Unauthorized`
  - **Response Body:**
  {
"message": "Unauthorized"
}

---

## Endpoint
### User Logout
`GET /user/logout`

#### Description
This endpoint allows the currently authenticated user to log out. The user must be logged in and provide a valid JWT token for authentication. The token will be added to a blacklist to prevent further use.

#### Responses

##### Success
- **Status Code:** `200 OK`
- **Response Body:**

{
"message": "User logged out successfully"
}


##### Error Responses
- **Status Code:** `402 Unauthorized`
  - **Response Body:**
  {
"message": "Unauthorized"
}


### Notes
- Ensure that the user is authenticated before accessing the profile or logout endpoints.
- The logout process invalidates the current session by blacklisting the token.

# Captain API Documentation

## Endpoint
`POST /captain/register`

### Description
Registers a new captain by providing personal and vehicle details.

### Request Body
The request body must be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "string (at least 3 characters)",
    "lastname": "string (optional, at least 3 characters)"
  },
  "email": "string (valid email format)",
  "password": "string (at least 6 characters)",
  "vehicle": {
    "color": "string (at least 3 characters)",
    "platenumber": "string (at least 3 characters)",
    "capacity": "number (minimum 1)",
    "type": "string (one of 'car', 'motorcycle', 'van', 'truck', 'auto rickshaw')"
  }
}

Responses
Success
Status Code: 201 Created

Response Body:
{
  "token": "string (JWT token)",
  "newCaptain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "platenumber": "string",
      "capacity": "number",
      "type": "string"
    },
    // additional fields...
  }
}
Error Responses
Status Code: 400 Bad Request

Response Body:
{
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field",
      "location": "body"
    }
  ]
}

Status Code: 500 Internal Server Error

Response Body:
{
  "error": "Server error"
}

Notes
Ensures that the email and vehicle plate number are unique.
Passwords are hashed before storage for security.

Endpoint
GET /captain/:id

Description
Retrieves the details of a captain by their unique ID.

Parameters
id (path parameter): The unique identifier of the captain.
Responses
Success
Status Code: 200 OK

Response Body:

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "platenumber": "string",
    "capacity": "number",
    "type": "string"
  },
  // additional fields...
}

Error Responses
Status Code: 404 Not Found

Response Body:
{
  "error": "Captain not found"
}

Status Code: 500 Internal Server Error

Response Body:
{
  "error": "Server error"
}

Endpoint
GET /captain/

Description
Retrieves a list of all captains.

Responses
Success
Status Code: 200 OK

Response Body:
[
  {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "platenumber": "string",
      "capacity": "number",
      "type": "string"
    },
    // additional fields...
  },
  // more captains...
]

Error Responses
Status Code: 500 Internal Server Error
Response Body:

{
  "error": "Server error"
}

Endpoint
DELETE /captain/:id

Description
Deletes a captain by their unique ID.

Parameters
id (path parameter): The unique identifier of the captain.

Responses
Success
Status Code: 200 OK

Response Body:
{
  "message": "Captain deleted successfully"
}

Error Responses
Status Code: 404 Not Found

Response Body:
{
  "error": "Captain not found"
}

Status Code: 500 Internal Server Error

Response Body:{
  "error": "Server error"
}