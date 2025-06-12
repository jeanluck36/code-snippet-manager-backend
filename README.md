
Code Snippet Manager Backend
This is the backend for a code snippet management application, built with Next.js, Mongoose, and MongoDB. It provides API endpoints for managing users, code categories, and snippets.

🚀 Features
User Management: Basic user model for potential authentication.
Category Management: Organize code snippets into categories (e.g., "JavaScript", "Python", "General"). Includes a default "General" category on startup.
Snippet Management: Store code snippets with properties like description, actual code, language, and tags, linked to a specific category.
MongoDB Integration: Uses Mongoose for elegant MongoDB object modeling.
💻 Technologies Used
Next.js: Full-stack React framework (used for API Routes)
Mongoose: MongoDB object data modeling (ODM) for Node.js
MongoDB: NoSQL database
Docker: Containerization for MongoDB
WSL2 (Windows Subsystem for Linux 2): Recommended development environment for Windows users
📋 Prerequisites
Before you begin, ensure you have the following installed on your Windows 11 machine:

Node.js & npm: https://nodejs.org/ (LTS version recommended)
Git: https://git-scm.com/
Visual Studio Code: https://code.visualstudio.com/ (or your preferred IDE)
WSL2 with an Ubuntu distribution:
Open PowerShell as Administrator and run: wsl --install
Ensure your Ubuntu distro is set to WSL2: wsl -l -v (should show Version 2)
If you encounter issues creating your WSL user, refer to the troubleshooting guides for getpwuid errors.
Docker Desktop for Windows: https://www.docker.com/products/docker-desktop/
🚀 Getting Started
Follow these steps to get the backend running on your local machine.

1. Enable Windows Features for WSL2 and Docker Desktop
Ensure these features are enabled in Windows:

Open Control Panel > Programs > Turn Windows features on or off.
Check the boxes for:
Virtual Machine Platform
Windows Subsystem for Linux
(Optional, if on Windows Pro/Enterprise for Hyper-V integration: Hyper-V)
Click OK and restart your PC if prompted.
2. Configure Docker Desktop for WSL Integration
For the docker command to work inside your WSL Ubuntu terminal:

Launch Docker Desktop on your Windows machine.
Right-click the Docker whale icon in your system tray (bottom-right) and select "Settings".
Go to the "WSL Integration" tab on the left sidebar.
Enable the toggle next to your "Ubuntu" distribution.
Click "Apply & Restart".
3. Clone the Repository into WSL
It's crucial to clone the project directly into your WSL Linux filesystem to avoid permission issues.

Open your WSL Ubuntu terminal (search "Ubuntu" in Windows Start or type wsl in PowerShell).
Navigate to your home directory (the default location):
Bash

cd ~
Clone the repository:
Bash

git clone https://github.com/jeanluck36/code-snippet-manager-backend.git
4. Create Environment Variables
Navigate into your cloned project directory and create a .env.local file.

In your WSL Ubuntu terminal:
Bash

cd code-snippet-manager-backend
touch .env.local
Open your project in VS Code (from the WSL terminal, type code . in your project's root).
Add the following line to the .env.local file:
MONGODB_URI=mongodb://127.0.0.1:27017/codesnippetsdb
5. Start the MongoDB Docker Container
Your MongoDB database runs as a Docker container.

In your WSL Ubuntu terminal (still in your project directory or cd ~ if you need to), ensure Docker Desktop is running on Windows.
Create and run the MongoDB container (using the latest stable image, as validated in your environment):
Bash

docker run -d -p 27017:27017 --name my-mongo mongo:latest
If you get a "permission denied" error, you need to add your user to the docker group:
Bash

sudo usermod -aG docker $USER
# Then, close your WSL terminal and reopen it (or run `wsl --shutdown` in Windows PowerShell, then relaunch WSL).
If you get "No such container" and know it existed before, the container might have been cleaned up. Just re-run the docker run command above.
Verify the container is running:
Bash

docker ps
You should see my-mongo listed with a STATUS of Up ....
6. Install Project Dependencies
In your WSL Ubuntu terminal, navigate to your project's root directory:
Bash

cd ~/code-snippet-manager-backend
Install the Node.js dependencies:
Bash

npm install
7. Run the Development Server
From your project's root directory in the WSL Ubuntu terminal:
Bash

npm run dev
The backend server will start, typically on http://localhost:3000.
✅ Testing the Backend (API Endpoints)
You can test the backend and database connection using the provided test endpoint.

Test Database Connection & User Model
Endpoint: GET http://localhost:3000/api/test-db
Description: This endpoint connects to the MongoDB database and performs a basic test (e.g., creating and finding a user). It also ensures the default "General" category is created if it doesn't exist.
How to Test:
Ensure your backend is running (npm run dev).
Open your web browser and navigate to: http://localhost:3000/api/test-db
You should see a JSON response similar to:
JSON

{
  "message": "Database connection and User model test successful!",
  "user": {
    "username": "testuser",
    "email": "test@example.com"
  },
  "dbStatus": "Connected"
}
📂 Project Structure (Relevant Backend Files)
src/app/api/test-db/route.ts: Test API endpoint for database connectivity.
src/lib/dbConnect.ts: MongoDB connection utility and default category seeding logic.
src/models/User.ts: Mongoose schema and model for user entities.
src/models/Category.ts: Mongoose schema and model for code categories.
src/models/Snippet.ts: Mongoose schema and model for code snippets.
package.json: Project dependencies and scripts.
.env.local: Environment variables (e.g., MONGODB_URI).