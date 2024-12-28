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