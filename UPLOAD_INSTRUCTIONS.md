Experiment 9 Screenshot and Upload Instructions

1. GitHub Repository Link
   - After creating your GitHub repository and pushing this project, copy the repository URL.
   - Example: https://github.com/<your-username>/<your-repo>

2. GitHub Actions Workflow Screenshot
   - In GitHub, go to the repository.
   - Click `Actions` in the menu.
   - Select the `CI-CD Docker` workflow.
   - Open the latest successful run on the `main` or `master` branch.
   - Take a screenshot of the workflow summary with the green success state.

3. Docker Hub Image Screenshot
   - Open Docker Hub and go to your repository for `exp9-api` and `exp9-web`.
   - Confirm that image tags `latest` and the commit SHA exist.
   - Take screenshots showing the repository page and tags.

4. Upload `ci-cd.yml`
   - Use the file `.github/workflows/ci-cd.yml` for GitHub Actions.
   - A convenient copy is also available at `ci-cd.yml` in the repository root.
Important:
- Set GitHub repository secrets before Docker publish can run:
  - `DOCKERHUB_USERNAME`
  - `DOCKERHUB_TOKEN`
Local validation commands

- Run production build locally:
  `docker compose up --build`

- Run development mode locally:
  `docker compose -f docker-compose.dev.yml up`

- Build frontend locally:
  `npm --prefix apps/web run build`

- Validate backend syntax locally:
  `node --check apps/api/src/index.js`
