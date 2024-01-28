## ByteBazaar Backend
Welcome to the backend of ByteBazaar, the engine that powers our seamless ecommerce platform for electronic gadgets. This backend is built using the  MongoDB, Express.js,Node.js stack and incorporates various technologies to ensure robust functionality.
Every file written in TypeScript.

## Technologies Used

- __Node.js__: A JavaScript runtime that executes server-side code.
- __Express.js__: A backend web application framework for Node.js that simplifies the development of APIs.
- __MongoDB__: A NoSQL database that stores data in JSON-like documents.
- __Mongoose__: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- __TypeScript__: A superset of JavaScript that adds static typing and other features.
- __Postman__: A collaboration platform for API development, used for testing and documenting APIs.
- __UUID__: A universally unique identifier library for generating unique IDs.
- __Morgan__: A middleware for logging HTTP requests.
- __Stripe__: Payment API for secure and efficient online transactions.
- __Cache__: Implementation of caching for optimizing data retrieval and response times.
- __Multer__: Middleware for handling multipart/form-data, commonly used for file uploads.
- __Cloudinary__: Cloud-based image and video management service for handling media uploads and storage.


## Features

- Separate Admin Dashboard API for easy management.
- Add, update, and delete products API.
- Visualize sales and marketing data API.
- Integration with Stripe Payment API for secure online transactions.
- Implementation of caching for optimized data retrieval.
- Middleware for handling file uploads using Multer and Cloudinary.
- User authentication and secure logins with Firebase Auth.
- TypeScript for enhanced code quality and maintainability.
- UUID for generating unique identifiers.
- Postman for testing and documenting APIs.

## Getting Started
Follow these steps to set up the ByteBazaar backend on your local machine.

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running
#### Navigate to the Project Directory
```
cd ByteBazaar-backend
```
#### Install Dependencies
```
npm install
```



## Set Up Environment Variables
Rename the `.env.sample` to ``.env``  in the root directory and configure the following variables:

```
MONGO_URI=
PRODUCTS_PER_PAGE=
STRIPE_KEY=
PORT=
```
Visit and Login [Stripe](https://www.stripe.com) for getting stripe key (under API key for developer get the secret key).


## Run the Application

#### Running Watch Mode for TypeScript
```
npm run watch
```

#### Running development server
```
npm run dev
```
Remember: Use different Terminal for watch mode and dev server
Run `mongo` if any error while connecting to MongoDB compass Localhost

Visit` http://localhost:4000` in your browser to check if the API is running ok.




## Contributing
We welcome contributions! Feel free to open issues or pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Inspired by the need for a user-friendly electronic shop platform.
- Thanks to the open-source community for the valuable tools and libraries.


Enjoy your ByteBazaar shopping experience!



