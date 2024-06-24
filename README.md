<div align="center" display="flex">
   
   # Project-X
</div>

![GitHub contributors](https://img.shields.io/github/contributors/mazerunner1001/Project-X)
![GitHub forks](https://img.shields.io/github/forks/mazerunner1001/Project-X)
![GitHub stars](https://img.shields.io/github/stars/mazerunner1001/Project-X)

Project-X is a comprehensive web application designed to offer users a seamless and intuitive experience when interacting with movies and TV shows. This application is built with modern web development technologies and adheres to the best practices in user interface design, ensuring a responsive and visually appealing user experience. Project-X includes robust features such as user authentication, profile management, and interactive information cards. The application is designed with a dark theme to enhance visual comfort and focus, making it ideal for prolonged usage.

The main objective of Project-X is to provide a platform where users can effortlessly browse, search, and explore detailed information about their favorite movies and TV shows. Whether it's viewing the latest releases, popular trends, or detailed cast and crew information, Project-X offers a holistic view of the entertainment world. Integration with external APIs ensures that the information is always up-to-date and accurate.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Connecting to a Database](#connecting-to-a-database)
- [Contributing](#contributing)
- [Contact](#contact)
- [Screenshots](#screenshots)




## Features

- **User Authentication**: Secure and efficient user authentication mechanisms allowing users to sign in, register, and log out. Authentication is handled using JSON Web Tokens (JWT) for secure session management.
- **Profile Management**: Users can view and update their profile information, including personal details, preferences, and more. The profile management system is designed to be user-friendly and accessible.
- **Responsive Design**: The application is fully responsive, providing an optimal viewing experience across a wide range of devices, from desktop computers to mobile phones.
- **Dark Theme**: A beautiful dark theme is applied throughout the application, enhancing visual comfort and reducing eye strain during prolonged usage.
- **Interactive Information Cards**: Detailed and interactive cards provide users with essential information about movies and TV shows, including synopses, ratings, runtime, and cast details.
- **Integration with External APIs**: The application integrates with external APIs to fetch real-time data about movies and TV shows, ensuring that users always have access to the latest information.
- **Dynamic Search Functionality**: Users can search for movies and TV shows using a dynamic search functionality that provides instant results as they type.
- **Detailed Movie and TV Show Pages**: Each movie and TV show has a dedicated page with comprehensive details, including production information, cast and crew, and related media.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yourusername/project-x.git
2. Install NPM packages for both client and server
   ```sh
    cd project-x
    npm install
    cd client
    npm install

### Usage

1. Run the development server
    ```sh
    Copy code
    cd project-x
    npm run dev
2. Open http://localhost:4000 to view it in the browser.

## Connecting to a Database

To ensure Project-X functions correctly, you need to set up a connection to MongoDB (or any other DB of your choice) and configure the use of MONGO_URL. Follow the steps below to set up your environment:

### Connecting to MongoDB

1. **Create a MongoDB Account**: If you don't have one already, sign up for a MongoDB account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Then you need to create a database to which you'll get a URL to access the DB.

2. **Configure Environment Variables**:
   - Create a `.env` file in the root of your project.
   - Add your MongoDB connection string to the `.env` file:
     ```env
     MONGO_URI=your_mongodb_connection_string
     ```
3. similary make a JWT_SECRET variable in your .env file and assign to it a value of your choice.
4. You also need to assign a port number of your choice to PORT in .env for hosting the backend server.


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### Contact

Praneeth Chandra - [@praneethswarna](https://x.com/praneethswarna) - [praneethchandra123](https://www.instagram.com/praneethchandra123/) - spraneethchandra123@gmail.com

Project Link: https://github.com/mazerunner1001/project-x

## Screenshots

### Home Page

<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/homepage1.png" alt="Home Page" style="width: 45%; margin: 15px;" />
  <img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/homepage2.png" alt="Home Page" style="width: 45%; margin: 15px;" />
</div>

### Movie/TV page

<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/moviepag1.png" alt="Movie/TV Page" style="width: 45%; margin: 15px;" />
  <img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/moviepage2.png" alt="Movie/TV Page" style="width: 45%; margin: 15px;" />
</div>

### Cast/Crew page

<img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/castpage.png" alt="Cast/Crew Page" style="width: 45%; margin: 15px;" />

### Profile page

<img src="https://github.com/mazerunner1001/Project-X/blob/master/src/assets/Images/profilepage.png" alt="Profile Page" style="width: 45%; margin: 15px;" />

