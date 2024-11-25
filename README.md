# BDMS - File Management System

A modern file management system for organizing and tracking company files. Built with NextJS, FastAPI, and SQLite.

## Features

- Create, read, update, and delete file records
- Search and filter files
- Role-based access control
- Department-wise organization
- Modern, responsive UI
- RESTful API backend

## Tech Stack

- Frontend:
  - NextJS 14
  - TypeScript
  - Tailwind CSS
  - Axios
  - React Icons
- Backend:
  - FastAPI
  - SQLAlchemy
  - SQLite
  - Pydantic
- Deployment:
  - Docker

## Prerequisites

- Node.js 18+
- Python 3.8+
- Docker (optional)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bdms-serendipity.git
   cd bdms-serendipity
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Start the backend server:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
bdms-serendipity/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── database/
│   └── files.db
└── README.md
```

## Docker Deployment

1. Build the Docker images:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

3. Access the application at http://localhost:3000

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
