# Project-X

![GitHub contributors](https://img.shields.io/github/contributors/mazerunner/project-x)
![GitHub forks](https://img.shields.io/github/forks/mazerunner/project-x)
![GitHub stars](https://img.shields.io/github/stars/mazerunner/project-x)
![GitHub license](https://img.shields.io/github/license/mazerunner/project-x)
![Twitter Follow](https://[img.shields.io/twitter/follow/your_twitter?style=social](https://x.com/praneethswarna))

![Project-X Logo](https://via.placeholder.com/150)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Screenshots](#screenshots)

## About the Project

Project-X is a full-featured web application designed to provide users with a seamless experience. This application includes user authentication, profile management, and various other functionalities, all wrapped up in a beautiful dark-themed UI.

## Features

- User authentication (Sign In, Register, Logout)
- Profile management (View and update profile)
- Responsive design
- Dark theme
- Interactive information cards
- Integration with external APIs

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS, Material Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: (Specify if deployed)

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
2. Open http://localhost:3000 to view it in the browser.

### API Endpoints

User Authentication
    - Login: POST /api/users/login
        - Body: { "email": "user@example.com", "password": "password123" }
    - Register: POST /api/users
        - Body: { "name": "John Doe", "email": "john@example.com", "password": "password123" }
    - Logout: POST /api/users/logout
    
User Profile
- Get Profile: GET /api/users/profile
- Update Profile: PUT /api/users/profile
    - Body: { "name": "John Doe", "email": "john@example.com", "password": "newpassword123" }

### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Contact
Your Name - @praneethswarna - spraneethchandra123@gmail.com

Project Link: https://github.com/mazerunner1001/project-x
