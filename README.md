# How to Run the Laravel Project

## Prerequisites
Ensure you have the following installed on your system:

- PHP (>=8.0 recommended)
- Composer
- MySQL
- Laravel (installed globally via Composer, optional)
- Node.js and NPM (if using frontend assets with Vite)

## Setup Instructions

### 1. Clone the Repository
```bash
 git clone https://github.com/morteza-mortezai/sanikar
 cd https://github.com/morteza-mortezai/sanikar
 cd backend
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to `.env` and update the necessary settings:
```bash
cp .env.example .env
```
Make sure to set up the database connection correctly:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=test2
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Run Database Migrations
```bash
php artisan migrate
```


### 6. Serve the Application
```bash
php artisan serve
```
Backend should now be running at:
```
http://127.0.0.1:8000
```

## API Endpoints
The application has the following API routes:

### Authentication Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive authentication token
- `GET /api/logout` - Logout (Requires authentication)

### Task Management Routes (Requires Authentication)
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task}` - Get a single task
- `PUT /api/tasks/{task}` - Update a task
- `DELETE /api/tasks/{task}` - Delete a task
- `PATCH /api/tasks/{task}/status` - Update task status

## Additional Commands
- **Clear Cache:** `php artisan cache:clear`
- **Run Queues:** `php artisan queue:work`
- **Tinker Console:** `php artisan tinker`

## Frontend  
If using frontend assets, install dependencies and run:
```bash
cd frontend
npm install
npm run dev
```

 application should now be running at:
```
http://localhost:5173/auth/login
```

