# 🧶 Crochet Website

This website is a showcase of my frontend and backend skills, demonstrating what I've learned so far. It features a collection of **handmade crochet products** and serves as a personal project to highlight my expertise in web development. The site is designed to be simple, responsive, and user-friendly, while showcasing various crochet products I’ve worked on.

## 🌟 Tech Stack

### Frontend:
- **React.js**: For building the user interface with reusable components.
- **Redux Toolkit**: For managing state across the app.
- **TypeScript**: For type safety and enhancing developer experience.
- **Tailwind CSS**: For styling with a clean, responsive design.
- **React Router**: For navigation and routing between pages.

### Backend:
- **Node.js** & **Express**: For building the RESTful API.
- **TypeScript**: For type-safe backend code.
- **Multer**: For handling image uploads.
- **MongoDB**: As the database to store product and user data.
- **JWT**: For authentication and secure user sessions.

## ⚙️ Components

### 1. **Navbar**
   - **Description**: The navigation bar that appears at the top of the website, providing easy access to the main sections like Home, Products, About, and profile.
   - **Features**: 
     - Fully responsive design that collapses into a hamburger menu on smaller screens.
     - Links to important pages and sections.

### 2. **Footer**
   - **Description**: The footer that appears at the bottom of the page, providing important information and quick links.
   - **Features**: 
     - Includes social media links (e.g. Instagram).
     - Contains contact information .
     - Simple, responsive design that adapts to all screen sizes.

### 3. **Profile**
   - **Description**: A user profile component that displays user information and any relevant details (e.g., order history, personal data).
   - **Features**: 
     - Displays user’s name, email, and other personal information.
     - Allows users to view and update their profile.
     - Conditional rendering based on whether the user is logged in.
     - It contains orders page and a log out button.

### 4. **AdminDashboard**
   - **Description**: A protected section of the website for admin users to manage products and monitor user activity.
   - **Features**:
     - Product management: Add, edit, and delete products.
     - User management: View registered users (if applicable).
     - Dashboard analytics (optional): Show stats like total users, products, or sales.
     - Accessible only to users with admin privileges (protected via JWT).

## 🚀 Features

### 🌐 Frontend
- **React + TypeScript**: A modern and type-safe UI powered by React.
- **Tailwind CSS**: Utility-first styling for a responsive and elegant layout.
- **Redux Toolkit**: Simplified and scalable state management.
- **React Router DOM**: Smooth navigation between pages without reloads.

### 🔒 Authentication & User Management
- **JWT-based Auth**: Secure login and signup system using JSON Web Tokens.
- **User Roles**: Role-based access — regular users and admins.
- **Profile Section**: View and edit personal user information.

### 🧑‍💼 Admin Dashboard
- Fully protected admin route.
- Add, edit, and delete featured products.
- (Optional) View users and other internal metrics.

### 🛍️ Product Display
- Dynamic product showcase component.
- Each item includes image, description, and price.
- Featured section for highlighted items.

### ☁️ Backend & API
- **Node.js + Express + TypeScript**: Clean and structured backend.
- **MongoDB**: Stores user and product data.
- **Multer**: Handles image uploads securely.
- RESTful APIs for full CRUD functionality.

### 📱 Responsive Design
- Mobile-first UI ensures accessibility across all devices.
- Consistent layout and navigation with a reusable Navbar and Footer.

## 🛠️ Getting Started

To run this project locally, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (installed and running)
- Tailwind CSS configured.

### 🔧 Installation Steps

1. **Clone the repository**: git clone git@github.com:Serah-bobo/E-commerce-project.git
2. **Change project directory**: cd E-commerce-project
3. **Set environment variables**:
    - create .env file in backend directory and add necessary configurations.
    - MONGO_URI=your_mongodb_connection_string
    - PORT= 5000
    - JWT_SECRET=your_jwt_secret
4. **Install dependancies**: npm install
5. **start development servers**:
    - Frontend: npm start, the app will be accessible at http://localhost:3000/
    - backend: npm start, the app will be accessible at http://localhost:5000/

## API ROUTES
  - GET/api/products: get all products
  - GET/api/products:/id: get a product by its id
  - POST/api/auth/signup: sign up
  - POST/api/auth/login: login
  - POST/api/auth/logout: logout
  - PUT/api/auth/profile: update profile

## Contributing
I welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request.
