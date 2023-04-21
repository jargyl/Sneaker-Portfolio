# Bottled Kicks

Bottled Kicks is a web application that allows users to showcase and manage their sneaker collection. The application is built using Next.js for the frontend and Node.js for the backend, with MongoDB as the database. Users can easily create their own MongoDB instance and configure the connection string in the .env file to enable the backend functionality.

The homepage of the application features an overview of the user's sneaker collection, which can be filtered by size. Users can also enable dark mode for a more visually appealing experience. Clicking on a sneaker will open a popup window containing additional information about the sneaker, such as its SKU. Users can also copy the name, SKU, and size of the sneaker using the copy icon button.

The admin page is only accessible to authorized users, and allows them to edit existing sneakers or add new ones. Sneakers can be added manually by entering all relevant information, or by using the scraper feature to automatically gather data from the sneaker reselling platform Restocks.net using only the SKU and size information.

The application's backend and frontend are both hosted on Vercel, while the database is hosted on MongoDB. With its user-friendly interface, customizable features, and seamless integration with MongoDB and Vercel, Bottled Kicks is the perfect solution for sneaker enthusiasts looking to showcase and manage their collection online.


During the development of this project, I learned a lot about web development and programming in general. Here are some of the key things I learned:

* Working with a full stack web development framework like Next.js
* Building and deploying a project using Vercel
* Developing a RESTful API using Node.js and MongoDB
* Implementing user authentication and authorization
* Building a web scraper to automate data collection from external sources
* Implementing a responsive and visually appealing user interface using Tailwind CSS
* Using environment variables to securely store sensitive information such as database connection strings and API keys
* Implementing data validation and error handling on the server-side
* Implementing search and filter functionality on the client-side
* Testing and debugging the application at various stages of development

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
