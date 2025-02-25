# Genealogy App Frontend

## Overview
The Genealogy App's frontend is a React-based web application built with Vite. It provides an intuitive user interface for visualizing family hierarchies and managing genealogy data. The app integrates with a Unity-powered visualizer to display family trees in an interactive and dynamic way.

## Features
- **User Authentication**: Sign up and log in functionality.
- **Family Hierarchy Visualization**: An interactive tree structure to explore family relationships.
- **Data Management**: Add, update, and remove family members through an intuitive interface.
- **Unity Integration**: Leverages Unity to render 3D family tree visualizations.
- **Fast and Modern UI**: Built using React with Vite for lightning-fast development and hot module replacement (HMR).

## Installation
Ensure you have Node.js installed, then follow these steps:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the App
To start the development server:

```bash
npm run dev
```
The app will be live at `http://localhost:5173/`.

## Building for Production
To build the optimized production version:

```bash
npm run build
```

## API Integration
The frontend interacts with the backend using RESTful APIs for:
- User authentication (login, sign-up)
- Fetching and updating family member data
- Syncing visualization data with Unity

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

## License
This project is licensed under the MIT License.

---

For any questions or support, please contact the development team.

