# GameSwipe

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
	<li>
	  <a href="#about-the-project">About The Project</a>
	</li>
	<ul>
	<li>
	  <a href="#technologies-used">Technologies Used</a>
	</li>
	<li>
	  <a href="#features">Features</a>
	</li>
	</ul>
	<li>
	  <a href="#getting-started">Getting Started</a>
	  <ul>
		<li><a href="#prerequisites">Prerequisites</a></li>
		<li><a href="#installation">Installation</a></li>
	  </ul>
	</li>
	<li><a href="#running-the-server">Running the server</a></li>
	<ul>
	  <li><a href="#development-mode">Development mode</a></li>
	  <li><a href="#production-mode">Production mode</a></li>
	</ul>
	<li><a href="#application-overview">Application overview</a></li>
	<ul>
	  <li><a href="#mobile-view">Mobile view</a></li>
	  <li><a href="#desktop-view">Desktop view</a></li>
	</ul>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Gameswipe is a responsive Single Page Application (SPA) designed to help users curate a virtual collection of their favorite games and those they have played. In addition to tracking your gaming history, Gameswipe fosters connections by enabling you to connect with friends and discover shared gaming interests.

### Technologies Used

- **TypeScript**
- **React**
- **Redux** for the State management
- **React Router** for the Navigation between pages
- **React Hook Form** for handling forms with validation
- **Scss** and **framer-motion** for the style and the animations

### Features

- **Eplore Games**: Users can explore a wide variety of games through an intuitive swipe-like interface, allowing them to filter by Console, Company, Genre, and Year of Production. This feature makes it easy to browse and discover new titles. Games can be added to your personal collection of played games, added to a wishlist for future consideration, or discarded if they don't fit your preferences.
- **Add Friends**: The Friends page enables users to connect with others by adding friends to their network. Once connected, you can explore a dedicated section that highlights games both you and your friends have enjoyed. Additionally, you can discover games that are unique to your friend's collection—either games they've played or ones they have shown interest in.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Ensure Node.js and npm are installed.

- Follow the setup instructions in the /server/README.md to ensure the backend is running.

### Installation

Before running the project in either development or production mode, you need to install the necessary packages.

```bash
npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running the Server

Before starting, ensure the backend server is running.

### **Development Mode**

Start the development server on [localhost:5173](http://localhost:5173) by running:

```bash
npm run dev
```

### **Production Mode**

To run the server in production mode, follow these steps:

Build the application with the following command:

```bash
npm run build
```

Start the production server on [localhost:5173](http://localhost:5173) by running:

```bash
npm run preview
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Application overview

The Application is completely responsive and can be used comfortably on mobile and larger screen.

### Mobile view

<video src="https://github.com/user-attachments/assets/07f5ec36-4635-4701-9818-4ff78a3ff032" autoplay loop muted ></video>

### Desktop view

<video src="https://github.com/user-attachments/assets/7886f38a-144c-4c1b-9698-8b9d3a8a3592" autoplay loop muted ></video>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
