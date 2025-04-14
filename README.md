# Realtime Chat Application

This is a **Realtime Chat Application** built with a **NestJS backend** and a **React + TypeScript frontend**. It uses **WebSockets** for real-time communication and is containerized with **Docker** for easy deployment.

## Features

- **Backend**:

  - Built with [NestJS](https://nestjs.com/), a progressive Node.js framework.
  - WebSocket support using [Socket.IO](https://socket.io/).
  - Modular architecture for scalability.
  - Unit and E2E tests with [Jest](https://jestjs.io/).

- **Frontend**:

  - Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for fast development.
  - Real-time chat interface with WebSocket integration.
  - TypeScript for type safety and better developer experience.

- **DevOps**:
  - Dockerized backend and frontend for consistent environments.
  - CI/CD pipeline using **GitHub Actions** for automated testing, building, and deployment.
  - Production-ready `docker-compose` for easy multi-service orchestration.

---

## Project Structure

```
.
├── backend/                # NestJS backend
│   ├── src/                # Source code
│   ├── test/               # Unit and E2E tests
│   ├── Dockerfile          # Production Dockerfile
│   ├── Dockerfile.dev      # Development Dockerfile
│   └── package.json        # Backend dependencies and scripts
├── frontend/               # React + Vite frontend
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── Dockerfile          # Production Dockerfile
│   └── package.json        # Frontend dependencies and scripts
├── docker-compose.dev.yml  # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
└── .github/workflows/      # CI/CD workflows
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/realtime-chat-application.git
   cd realtime-chat-application
   ```

2. Start the development environment using Docker Compose:

   ```bash
   docker-compose -f docker-compose.dev.yml up --watch
   ```

3. Access the services:
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Backend WebSocket: [http://localhost:3030](http://localhost:3030)
   - Frontend: [http://localhost:5173](http://localhost:5173)

---

## CI/CD Pipeline

This project uses **GitHub Actions** for CI/CD. The pipeline includes the following steps:

1. **Backend CI/CD**:

   - Install dependencies.
   - Run unit and E2E tests.
   - Build the Docker image and push it to Docker Hub.

2. **Frontend CI/CD**:

   - Install dependencies.
   - Run linting and tests.
   - Build the Docker image and push it to Docker Hub.

3. **Deployment**:
   - Pull the latest Docker images from Docker Hub.
   - Restart the services using `docker-compose.prod.yml`.

### GitHub Actions Workflow

The CI/CD workflow is defined in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml):

---

## Simplified Service Management

To simplify service management, you can use the following commands:

- **Start services**:

  ```bash
  docker-compose -f docker-compose.prod.yml up -d
  ```

- **Stop services**:

  ```bash
  docker-compose -f docker-compose.prod.yml down
  ```

- **View logs**:
  ```bash
  docker-compose -f docker-compose.prod.yml logs -f
  ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
