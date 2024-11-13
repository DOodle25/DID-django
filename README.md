## About the Project

### District Integration Dashboard
![GitHub](https://img.shields.io/github/repo-size/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/languages/code-size/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/license/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/last-commit/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/stars/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/forks/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/issues/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/issues-pr/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/commit-activity/m/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/commit-activity/y/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/contributors/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/downloads/DOodle25/DID-django/total?style=plastic) 
![GitHub](https://img.shields.io/github/release/DOodle25/DID-django?style=plastic) 
![GitHub](https://img.shields.io/github/issues-closed/DOodle25/DID-django?style=plastic)

https://github.com/user-attachments/assets/1bbb40b6-7c62-4acf-8dcc-1f6a8de0b4d1

### **Azure Hosted**
- **Backend**: [Admin Login](https://district-integrated-dashboard-backend-cudqcnbehzgye3c9.centralindia-01.azurewebsites.net/admin/login/?next=/admin/)
- **Frontend**: [Dashboard Frontend](https://ambitious-bush-0645df200.5.azurestaticapps.net/)
<br/>
Live - https://didfrontend.onrender.com/
<br/>
<br/>
## Related Repo:

frontend - https://github.com/DOodle25/DID-Frontend
<br/>
backend - https://github.com/DOodle25/DID-Backend
<br/>
used for temporory hosting frontend and backend before full release for testing
<br/>

## About
The **District Integration Dashboard** is a comprehensive web application that provides an all-in-one platform for managing and visualizing district-level data in a seamless and intuitive interface. Built using the **React** and powered by Python on the backend with **Django**, the dashboard is designed to serve administrative and government needs, offering a range of functionalities such as population management, scheme tracking, and city data aggregation. The integration of both **frontend and backend technologies** ensures a smooth, secure, and responsive user experience.

### Key Features
- **District Data Visualization**: Visualize various district-level data like population demographics, public services (schools, hospitals, bus stations, etc.), and schemes. The dashboard uses **React** for a highly interactive user interface.
  
- **Data Management & Analytics**: Manage critical data points for different cities and talukas within the district, including the number of schools, hospitals, police stations, etc. This data can be visualized through charts and tables for easier decision-making.

- **Secure Authentication**: Implemented token-based authentication using **JWT (JSON Web Tokens)**, ensuring secure access to the dashboard and its features.

- **User Roles & Permissions**: Custom user authentication built using **Django's authentication framework** enables role management for different users, allowing access to sensitive data to be limited to authorized personnel only.

- **RESTful API**: A robust backend API is developed using **Django Rest Framework (DRF)**, making data easily accessible and modifiable through various HTTP requests (GET, POST, PUT, DELETE).

- **SQLite Database**: Efficient and lightweight database integration using **SQLite** for storing critical information, including user data, population data, and scheme information.

- **Real-time Data Updates**: The system allows for real-time updates to city and scheme data, ensuring that users always have the latest information at their fingertips.

### Technologies Used

#### Frontend:
- **React**: The entire frontend is built using React, providing a fast and dynamic user experience. The app uses **React Context API** for managing global states across components.
  
- **JavaScript**: JavaScript is heavily used throughout the frontend to implement interactive elements, such as population graphs, scheme tracking, and dynamic table generation.

- **Tailwind CSS**: Tailwind CSS was used for rapid UI development, ensuring responsiveness across various screen sizes while maintaining a clean and modern look.

#### Backend:
- **Django**: The project uses **Django** as the primary backend framework to handle user requests, authentication, and business logic for managing district data.

- **Django Rest Framework**: **DRF** enables seamless communication between the frontend and backend through RESTful APIs.

- **JWT Token Authentication**: JWT is employed for secure user authentication, ensuring that only authorized users can access the sensitive data presented in the dashboard.

- **SQLite Database**: The project stores all data in **SQLite**, an easy-to-use, zero-configuration database. This allows for fast querying and easy management of district and scheme data.

### Detailed Features Breakdown

#### 1. **Population and City Data Management**
   - The dashboard includes modules for viewing and updating city population and related data points. 
   - Each city is tracked for its number of public services, including schools, hospitals, railway stations, and more.
   - **RESTful APIs** allow for the addition, modification, and deletion of city-related data. The data is validated and stored securely in the **SQLite** database.
   
   ![City Data Visualization](https://github.com/DOodle25/DID-django/blob/main/README-content/dashboard.png)
   ![City Data Visualization2](https://github.com/DOodle25/DID-django/blob/main/README-content/population.png)

#### 2. **Schemes and Programs**
   - The dashboard features a section for managing government schemes and programs across districts. Users can add new schemes, update existing ones, and delete those that are no longer active.
   - This section also allows filtering and searching schemes by city, date, or type.
   - The frontend employs **Context API** to manage global scheme state, making it easier to render data across multiple components without the need for redundant API calls.

   ![Scheme Management](https://github.com/DOodle25/DID-django/blob/main/README-content/new%20scheme.png)
    ![Scheme Management](https://github.com/DOodle25/DID-django/blob/main/README-content/scheme1.png)
    ![Scheme Management](https://github.com/DOodle25/DID-django/blob/main/README-content/scheme2.png)
#### 3. **Secure Authentication**
   - User login and registration are managed through the **JWT token** system, making the platform both secure and scalable.
   - Custom roles (e.g., admin, manager) control who can view and modify district and scheme data.
   - **Django** and **DRF** handle the backend authentication, ensuring token validity for each request.
   - Passwords are securely hashed and stored in the database, and users can change their credentials via the user profile settings.

   ![User Authentication](https://github.com/DOodle25/DID-django/blob/main/README-content/login.png)

#### 4. **User Management and Profile Updates**
   - Once logged in, users can access their profiles to update information such as name, email, and password.
   - The backend verifies the user's credentials using the **password hashing mechanism** in Django and updates the user's data accordingly. 
   - A session-based approach ensures that users' tokens are valid across multiple requests, with automatic token expiration for enhanced security.

   ![Profile Management](https://github.com/DOodle25/DID-django/blob/main/README-content/manage.png)

#### 5. **Responsive UI**
   - The entire dashboard is fully responsive, built with **Tailwind CSS** and **React** to ensure compatibility across all device types, including desktops, tablets, and smartphones.
   - Components like tables, graphs, and forms automatically adjust to different screen sizes, providing a seamless user experience.

   ![Responsive Design]!(https://github.com/DOodle25/DID-django/blob/main/README-content/RESPONSIVE.png)

#### 6. **Data Security and Validation**
   - **Django** and **SQLite** ensure that all data transactions are secure and error-free. Extensive validation is done on both the backend and frontend before data is saved or updated, preventing unauthorized access or data corruption.
     
  ![Responsive Design](https://github.com/DOodle25/DID-django/blob/main/README-content/edit.png)
#### 7. **Session-Based Token Management**
   - **JWT-based session handling** makes it easy for users to log in and remain authenticated as they navigate across different parts of the dashboard.
   - The token is stored securely in **local storage**, ensuring that user sessions remain active until they explicitly log out. This also helps protect sensitive information such as city statistics and government scheme data.
     
  ![[Responsive Design](https://github.com/DOodle25/DID-django/blob/main/README-content/ui1.png)
  ![Scheme Management](https://github.com/DOodle25/DID-django/blob/main/README-content/ui2.png)
#### 8. **Django Admin Panel**
   - A powerful **Django Admin Interface** is included, giving admin users the ability to directly manage all aspects of the application, including users, city data, and schemes.
   - This built-in admin dashboard allows for faster updates and administration without needing to access the database manually.
     
  ![Responsive Design](https://github.com/DOodle25/DID-django/blob/main/README-content/admin.png)
### Installation

To get started with the **District Integration Dashboard**, follow these steps:

### Frontend Setup and Execution

1. **Navigate to the Frontend Directory:**
   First, switch to the frontend directory, which is named `DIDFrontend`. Run the following command in your terminal:

   ```bash
   cd DIDFrontend
   ```

2. **Install Dependencies:**
   After navigating to the `DIDFrontend` directory, install all the necessary dependencies by running:

   ```bash
   npm install
   ```

3. **Run the Development Server with Vite:**
   To start the frontend development server using **Vite**, use the following command:

   ```bash
   npm run dev
   ```

4. **Access the Frontend:**
   Once the server starts, Vite will output a local development URL (e.g., `http://localhost:3000`). Open the browser and navigate to that URL to view the frontend.

---

### Backend Setup and Execution

1. **Navigate to the Backend Directory:**
   Ensure you are in the backend folder (root of the Django project).

2. **Install Dependencies:**
   Make sure all the necessary dependencies are installed for the backend by running:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Django Development Server:**
   Start the Django server on port `5000` by running:

   ```bash
   python manage.py runserver 5000
   ```

4. **Access the Backend:**
   The Django backend will now be available at `http://localhost:5000`. You can use this to handle API requests and data operations from the frontend.

---

### Final Setup

Ensure both the frontend (running via Vite) and the backend (Django) are running concurrently to have the full functionality of your **District Integration Dashboard**:

- **Frontend**: `http://localhost:3000` (or the port Vite provides)
- **Backend**: `http://localhost:5000`

### Future Enhancements

- **Advanced Data Analytics**: Implement more advanced analytics tools for better decision-making capabilities.
- **Real-Time Notifications**: Add a feature for real-time notifications when significant changes are made to the district data or schemes.
- **Additional Integrations**: Expand the project to include integrations with third-party APIs, such as weather data, to offer more comprehensive district insights.

---

By utilizing the **District Integration Dashboard**, government agencies, municipal authorities, and other relevant stakeholders can effectively manage, track, and analyze district-level data with an intuitive, scalable, and secure platform.
