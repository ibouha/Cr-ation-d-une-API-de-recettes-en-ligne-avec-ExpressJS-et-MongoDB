
# Recipe App

This repository contains a simple Express.js application for managing recipes. It uses MongoDB as a database to store and retrieve recipe data. Below is a guide on setting up and running the application.

# Prerequisites

Node.js: Make sure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/en).

MongoDB: Ensure that you have MongoDB installed locally. You can download it [here](https://www.mongodb.com/docs/manual/installation/).

# Getting Started
1-Clone the repository to your local machine:   
`git clone https://github.com/your-username/recipe-app.git`

2-Navigate to the project directory: 
`cd recipe-app` 

3-Install the dependencies : `npm install`

# Configuring MongoDB

1-Ensure MongoDB is running on your local machine.
2-Open the 'config/connect.js' file and update the connection string if your MongoDB instance is running on a different host or port.

# Running the Application

1-Start the Express server:
 `node index.js`
 The server will run on http://localhost:3008  by default.

2-Use your preferred API testing tool (e.g., Postman, Insomnia) or a web browser to interact with the API.

# API Endpoints

GET /all: Retrieve all recipes.

POST /add: Add a new recipe. Send a JSON object with the recipe details in the request body.

PUT /update/:id: Update a recipe by ID. Provide the recipe ID in the URL and send the updated details in the request body.

DELETE /delete/:id: Delete a recipe by ID. Provide the recipe ID in the URL.

# Example Requests
## Adding a Recipe :
````
POST http://localhost:3008/add  
Content-Type: application/json

{
  "title": "Delicious Pasta",  
  "description": "A tasty pasta dish",  
  "imageUrl": "https://example.com/pasta.jpg",  
  "rating": 4,  
  "category": "Main Dish",  
  "ingredients": ["Pasta", "Tomato Sauce", "Cheese"],  
  "instructions": ["Boil pasta", "Mix with sauce", "Top with cheese"],   
  "equipments": ["Pot", "Pan"]   
}
````

# Updating a Recipe
````
PUT http://localhost:3008/update/recipe-id
Content-Type: application/json

{
  "rating": 5,
  "instructions": ["Boil pasta", "Mix with sauce", "Top with cheese and bake"]
}
````
# Deleting a Recipe
`DELETE http://localhost:3008/delete/recipe-id
`

# Contributing
Feel free to contribute to this project by creating issues or submitting pull requests.










