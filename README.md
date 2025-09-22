# Course Enrollment API

A RESTful API for managing course enrollments, built with Express.js, TypeScript, and SQLite.

## Features

- Course management (create, list)
- Student enrollment management

## Installation

1. Clone the repository
```sh
git clone https://github.com/ah2909/course-enrollment.git
```
2. Install dependencies
```sh
npm install
```
3. Run locally (development)
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
- `GET /courses`

```sh
curl http://localhost:3000/courses
```

- Response: List of all available courses

#### Create a course

- `POST /courses`
- Body:
```json
{
  "title": "Course Title",
  "description": "Course Description",
  "difficulty": "Beginner" | "Intermediate" | "Advanced"
}
```

```sh
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Machine Learning","description":"Intro to ML","difficulty":"Intermediate"}'
```

### Enrollments

#### Enroll in a course

- `POST /enrollments`
- Body:
```json
{
  "courseId": 1,
  "studentEmail": "student@example.com"
}
```

```sh
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{"courseId":1,"studentEmail":"test@gmail.com"}'
```

#### Get student enrollments

- `GET /student/:email/enrollments`
```sh
curl http://localhost:3000/student/test@gmail.com/enrollments
```

- Response all courses a student is enrolled in

## Testing

Run tests locally:
```sh
npm test
```

Run tests inside Docker container:
```sh
docker exec -it course-enrollment npm test
```

## Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
```

## Live Demo
- Frontend is deployed on Vercel: https://course-enrollment-fe.vercel.app/
- Backend API is deployed on a VPS with Docker: https://demo.cryptofolio.io.vn/