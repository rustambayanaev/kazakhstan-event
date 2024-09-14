# EventWave: Event Management System

Welcome to **EventWave**, an intuitive Event Management System built to streamline the process of planning, registering, and booking tickets for events. This comprehensive solution covers a wide range of features, making event management easier and more efficient.

As the architect of this system, I focused on delivering a smooth user experience by incorporating modern design principles into the user interface and prioritizing functionality. The system is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and follows the **Agile Scrum** methodology for continuous improvements throughout development.

## **Key Features**
- **Schedule an Event:** Easily create and schedule events.
- **View Upcoming Events:** Browse through a list of all upcoming events.
- **Event Calendar:** Visualize events on a calendar for better planning.
- **Approval System:** Manage event approvals.
- **Ticket Booking:** Secure tickets through the platform.
- **QR Code Generation:** Generate and receive tickets as QR codes for smooth event check-in.

---

## **Technologies Used**
- **React.js** – Frontend library for a dynamic UI.
- **Node.js** – Server-side runtime environment.
- **Express.js** – Backend framework for routing and handling HTTP requests.
- **MongoDB** – NoSQL database for event data storage.
- **NPM** – Node Package Manager for dependency management.
- **JWT (JSON Web Tokens)** – For secure user authentication.
- **QR Code Generation** – For ticket access and verification.

---

## **Skills Highlighted**
- **UI/UX Design** (Figma) – Designed a user-friendly interface with a focus on a seamless experience.
- **Requirements Analysis** – Thorough analysis of the business and technical needs.
- **React.js Development** – Built the frontend with reusable components and state management.
- **MongoDB Database** – Implemented a schema for storing event and user data.
- **Express.js and Node.js** – Developed the backend with a focus on performance and scalability.

---

## **Getting Started**

### **Prerequisites**
- Node.js installed on your machine
- MongoDB Database set up

### **Installation**

Follow these steps to install and run **EventWave** on your local machine:

1. **Clone the repository** to your machine.
    ```bash
    git clone https://github.com/your-repo/eventwave.git
    ```

2. **Navigate to the project directory**:
    Open two terminal windows:
    - **Frontend (Client):**
        ```bash
        cd client
        ```
    - **Backend (API):**
        ```bash
        cd api
        ```

3. **Install dependencies**:
    Run the following command in both terminal windows to install the necessary dependencies:
    ```bash
    npm install
    ```

4. **Configure environment variables**:
    Create a `.env` file in the root of the `api` folder with the following content, replacing placeholders with your actual values:
    ```bash
    MONGODB_URI=mongodb://localhost/your-database-name
    JWT_SECRET=your-jwt-secret
    ```

5. **Start the server**:
    In the **API** terminal window, start the server with:
    ```bash
    nodemon start
    ```
    If you face issues, try running it in PowerShell with:
    ```bash
    PowerShell -ExecutionPolicy Bypass nodemon
    ```

6. **Start the client**:
    In the **Client** terminal window, start the React development server:
    ```bash
    npm run dev
    ```

7. **Access the Application**:
    - **Frontend**: Open your browser and navigate to: `http://localhost:5173`
    - **Backend**: The server will be running at: `http://localhost:4000`

---

### **Thank you for choosing EventWave!**
