# Teamsync
# Smart Home Rentals

A web-based platform that allows users to browse and rent smart homes with enhanced control, automation, and convenience.

## 🚀 Project Description

Smart Home Rentals enables property owners to list their smart-enabled properties for rent, and renters to explore and lease homes equipped with smart technology. The platform features a responsive frontend, RESTful API, and backend integrations.

## 🛠 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd project
Install dependencies:

bash
Copy
Edit
npm install
Navigate to backend directory (if required) and install its dependencies:

bash
Copy
Edit
cd backend
npm install
📡 API Endpoints
Note: These endpoints are assumed based on common practices. Adjust according to your actual backend implementation.

GET /api/properties - Get all listed properties

GET /api/properties/:id - Get details of a single property

POST /api/properties - Add a new property (admin/owner)

PUT /api/properties/:id - Update a property listing

DELETE /api/properties/:id - Delete a property listing

POST /api/auth/login - User login

POST /api/auth/register - User registration

▶️ How to Run the App
Frontend
bash
Copy
Edit
npm run dev
Backend
bash
Copy
Edit
cd backend
npm run start
Ensure both frontend and backend servers are running. The frontend will typically be available at http://localhost:5173 and the backend at http://localhost:3000 or as configured.
