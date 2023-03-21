# Bottled Kicks

Bottled Kicks is a web application that displays a collection of sneakers in a portfolio format. The application uses a Next.js frontend and a Node.js backend with MongoDB as the database. Users can create their own MongoDB and fill in the connection string in the `.env` file to make the backend work.

## Getting Started

To get started with Bottled Kicks, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies for both the frontend and backend:
cd client
npm install
cd ../server
npm install
3. Create a MongoDB database and fill in the connection string in the `.env` file. You can also modify other environment variables in the `.env` file if necessary. 
Here's an example `.env` file that you can use as a template:
	```ENV=development
	DATABASE_CONNECTION=mongodb+srv://username:password@cluster0.mongodb.net/bottledkicks?retryWrites=true&w=majority
	DATABASE_CONNECTION_OPTIONS={"useNewUrlParser": true}
	PORT=3000
	SECRET=mysecretkey
	JWT_EXPIRATION=3600000
	```
	In this example, replace `username` and `password` with your own MongoDB Atlas username and password, and replace `cluster0` with your own MongoDB Atlas cluster name. You can also modify the other environment variables if necessary. Just make sure not to share your actual MongoDB connection string or secret key in any public repository or forum.

4. Start the frontend and backend separately:
	```
	cd client
	npm run dev
	```
	```
	cd server
	node app.js
	```

5. Navigate to `http://localhost:3001` in your web browser to view the Bottled Kicks application.

## Technologies Used

Bottled Kicks is built with the following technologies:

### Frontend

- Next.js
- Ant Design
- Tailwind CSS

### Backend

- Node.js
- MongoDB
- Mongoose

## Screenshots

### Homepage `/`

#### Home
![Homepage](https://imgur.com/xMAgRE8.png "Homepage")

#### Filter by Size
![Homepage Size Select](https://imgur.com/6aZk1ng.png "Homepage Size Select")

### Login `/admin`

![Login](https://imgur.com/L5ip7lu.png "Login")


### Edit `/edit`

#### Product Overview
![Product Overview](https://imgur.com/pzhD7P4.png "Product Overview")

#### Product Edit
![Product Edit](https://imgur.com/YAjpevY.png "Product Edit")

#### Add Product
![Add Product](https://imgur.com/fEiT1lG.png "Add Product")

## License

Bottled Kicks is licensed under the [MIT License](LICENSE).
