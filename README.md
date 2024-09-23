<h1> Simple Authentication System with Node.js, JWT, MongoDB, and Postman </h1>

## Overview
Este projeto é um sistema de autenticação simples desenvolvido com Node.js, JWT (JSON Web Token), MongoDB e Postman para testar requisições na API. Ele demonstra funcionalidades básicas como registro de usuário, login e rotas protegidas usando JWT para autenticação. O projeto inclui práticas essenciais de segurança, como hashing de senhas com bcrypt e validação de dados de entrada para garantir consistência e segurança.

# Features
**Public Route**: Uma rota GET simples para acessar a aplicação.
**User Registration**: Permite que os usuários se registrem com senhas hashadas usando bcrypt.
**User Login**: Autentica os usuários e fornece um token JWT.
**Protected Route**: Garante que apenas usuários autenticados possam acessar certas rotas, protegidas por um middleware que verifica a validade do token JWT.

## Packages Used
The project utilizes the following npm packages:

* **bcrypt**: For hashing passwords.
* **dotenv**: For managing environment variables.
* **express**: For creating the server and handling routes.
* **jsonwebtoken**: For creating and verifying JWT tokens.
* **mongoose**: For interacting with MongoDB.
* **nodemon** (dev dependency): For automatically restarting the server during development.

## Installation
1. Clone the repository:

  * git clone https://github.com/pLogicador/backend-mastery
  * cd simple-auth-system
  
2. Install dependencies:

  * npm install


3. Set up environment variables by creating a .env file:

    **DB_USER=yourMongoDBUser**
    
    **DB_PASS=yourMongoDBPassword**
    
    **SECRET=yourJWTSecret**

4. Start the server:

  * npm run dev

## API Endpoints
  **Public Route**

  * **GET /**: Welcome message to the API
  
    {
      "msg": "Welcome to our API"
    }

**User Registration**
* **POST /auth/register**: Registers a new user with name, email, and password.
  
  * Request body:
    
   {
     "name": "User Name",
     "email": "user@example.com",
     "password": "password123",
     "confirmpassword": "password123"
   }

  * Response:
  
   {
   "msg": "User created successfully!"
   }


**User Login**
 * **POST /auth/login**: Logs in a user and provides a JWT token.
    
    * Request body:
    
     {
       "email": "user@example.com",
       "password": "password123"
     }

    * Response:
    
     {
       "msg": "Authentication completed successfully",
       "token": "yourJWTToken"
     }

**Protected Route**
   * **GET /user/:id**: Access user data with a valid JWT token.

      Headers:
      {
        "Authorization": "Bearer yourJWTToken"
      }
      
      Response (if token is valid):
      {
        "user": {
          "name": "User Name",
          "email": "user@example.com",
          "_id": "userId"
        }
      }

## Middleware
The checkToken middleware is used to protect routes by verifying the presence and validity of the JWT token.

* **Functionality**:
  * Checks if the token is present in the Authorization header.
  * Verifies the token using the secret key.
  * Denies access if the token is missing or invalid, or allows access if the token is valid.
    
## Security Considerations
  * **Password Hashing**: User passwords are hashed using bcrypt before being stored in the database to ensure they are not stored in plain text.
  * **Token-Based Authentication**: JWT tokens are used to authenticate users without maintaining server-side sessions, enhancing security and scalability.
  * **Input Validation**: Basic validation is performed on user inputs to ensure data consistency and security. Additional validations can be easily added for more robust security.
   
## Usage
* **Postman**: Used to simulate frontend requests for registering and logging in users, and for testing protected routes with JWT tokens.
* **Extensibility**: This project serves as a simple template that can be extended with additional validations, features, and security measures.

## Conclusion
Este projeto fornece uma base simples e sólida para um sistema de autenticação utilizando Node.js, JWT e MongoDB. Ele demonstra conceitos e práticas-chave para a construção de mecanismos de autenticação seguros e pode ser facilmente estendido e customizado para aplicações mais complexas.


##
**© 2024 pLogicador**

Este projeto foi desenvolvido por pLogicador e está disponível para você usar como referência. Sinta-se à vontade para utilizar, modificar e compartilhar este material. Divirta-se desenvolvendo! 🚀
