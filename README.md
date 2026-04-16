# Experiment 9 Project - React + Node.js (Dockerized + CI/CD + AWS)

This repository is prepared for:

- Experiment 9.1 - Dockerize a React application
- Experiment 9.2 - Set up CI/CD pipeline using GitHub Actions
- Experiment 9.3 - Deploy full stack on AWS EC2 with Application Load Balancer

Production-ready full-stack setup includes:

- React (Vite) frontend
- Express API backend
- Docker multi-stage builds for optimized images
- Nginx reverse proxy for SPA + `/api` routing
- GitHub Actions CI/CD for Docker Hub image push
- EC2 deployment via GitHub Actions

## Experiment 9 Required Deliverables
For submission, capture the following:

- GitHub repository link after you push this repo to GitHub.
- Screenshot of the latest successful run for the `CI-CD Docker` workflow in GitHub Actions.
- Screenshot of Docker Hub showing the pushed images for `exp9-api` and `exp9-web`.
- Upload the workflow file located at `.github/workflows/ci-cd.yml` (a copy is also available at `ci-cd.yml`).

## Folder structure

```
.
├─ apps/
│  ├─ web/                # React frontend
│  │  ├─ src/
│  │  ├─ Dockerfile
│  │  ├─ nginx.conf
│  │  └─ package.json
│  └─ api/                # Node/Express backend
│     ├─ src/
│     │  ├─ routes/
│     │  └─ index.js
│     ├─ Dockerfile
│     ├─ .env.example
│     └─ package.json
├─ docker-compose.yml      # Production stack
├─ docker-compose.dev.yml  # Dev stack with hot reload
└─ README.md
```

## Run in production mode

```bash
docker compose up --build
```

- App: http://localhost
- API health: http://localhost/api/health

## Run in development mode

```bash
docker compose -f docker-compose.dev.yml up
```

- Web (Vite): http://localhost:5173
- API: http://localhost:4000

## Build images only

```bash
docker compose build
```

## Stop containers

```bash
docker compose down
```

## Docker (manual image push)

Build and push images manually to Docker Hub:

```bash
docker login
docker build -f apps/api/Dockerfile -t <dockerhub-username>/exp9-api:latest .
docker build -f apps/web/Dockerfile -t <dockerhub-username>/exp9-web:latest .
docker push <dockerhub-username>/exp9-api:latest
docker push <dockerhub-username>/exp9-web:latest
```

## CI/CD with GitHub Actions

Workflow file:

- `.github/workflows/ci-cd.yml`

Pipeline behavior:

- On Pull Request to `main`: runs CI checks for API and WEB.
- On Push to `main`: runs CI checks, then builds and pushes Docker images.
- Manual run: supported via `workflow_dispatch` from Actions tab.
- On successful push with EC2 secrets configured: deploys latest images to EC2.

Required GitHub repository secrets:

- `DOCKERHUB_USERNAME` = your Docker Hub username
- `DOCKERHUB_TOKEN` = Docker Hub access token (not password)

Images pushed by workflow:

- `<dockerhub-username>/exp9-api:latest`
- `<dockerhub-username>/exp9-api:<commit-sha>`
- `<dockerhub-username>/exp9-web:latest`
- `<dockerhub-username>/exp9-web:<commit-sha>`

Additional required secrets for EC2 deployment:

- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

## AWS EC2 + ALB deployment (Experiment 9.3)

Use:

- `docker-compose.ec2.yml` (production deploy file using Docker Hub images)
- `aws-deployment.md` (step-by-step AWS setup and ALB DNS extraction)

After setup, your public submission URL will be:

`http://<your-alb-dns-name>`

## Submission links (for teacher)

Share these 4 links in your submission:

1. GitHub Repository link:
   `https://github.com/<your-username>/<your-repo>`
2. GitHub Actions workflow run link:
   `https://github.com/<your-username>/<your-repo>/actions`
3. Docker Hub API image link:
   `https://hub.docker.com/r/<your-dockerhub-username>/exp9-api`
4. Docker Hub WEB image link:
   `https://hub.docker.com/r/<your-dockerhub-username>/exp9-web`
