# Course Enrollment API

A RESTful API for managing course enrollments, built with Express.js, TypeScript, and SQLite.

## Features

-   Course management (create, list)
-   Student enrollment management
-   Input validation using Joi
-   SQLite database with automated schema creation
-   Docker support

## Prerequisites

-   Node.js (v24 or later)
-   npm
-   Docker (optional)

## Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

## Running the Application

```sh
npm run dev
```

### Using Docker

```sh
docker-compose up
```

## Database

The application uses SQLite and automatically:

-   Creates database schema on startup
-   Seeds initial course data if the database is empty

## API Endpoints

### Courses

#### List all courses

-   `GET /courses`
-   Response: List of all available courses

#### Create a course

-   `POST /courses`
-   Body:

```json
{
  "title": "Course Title",
  "description": "Course Description",
  "difficulty": "Beginner" | "Intermediate" | "Advanced"
}
```

### Enrollments

#### Enroll in a course

-   `POST /enrollments`
-   Body:

```json
{
	"courseId": 1,
	"studentEmail": "student@example.com"
}
```

#### Get student enrollments

-   `GET /student/:email/enrollments`
-   Returns all courses a student is enrolled in

## Testing

Run the test suite:

```sh
npm test
```

### Run tests in Docker container directly
```sh
docker exec -it course-enrollment npm test
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
SECRET_KEY=your-secret-key
```
