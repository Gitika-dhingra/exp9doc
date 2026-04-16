# Experiment 9.3 - Deploy Full Stack on AWS EC2 + ALB

This document gives you a reproducible deployment path for your submission.

## 1) Prerequisites

- AWS account with permission for EC2, VPC, Target Group, ALB, Security Groups
- Docker Hub account
- GitHub repository secrets configured (see below)

## 2) Create EC2 instance

1. Launch an Ubuntu EC2 instance (t2.micro is fine for experiment demo).
2. Security Group (instance):
   - Inbound: TCP `22` from your IP
   - Inbound: TCP `80` from ALB security group only (recommended) or temporary `0.0.0.0/0`
3. SSH into EC2 and install Docker:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker
```

## 3) Configure ALB

1. Create Target Group:
   - Target type: `Instance`
   - Protocol: `HTTP`
   - Port: `80`
   - Health check path: `/api/health`
2. Register your EC2 instance in this target group.
3. Create Application Load Balancer:
   - Scheme: `internet-facing`
   - Listener: HTTP `80`
   - Attach ALB security group allowing inbound `80` from `0.0.0.0/0`
   - Forward to your target group
4. In EC2 security group, allow inbound `80` from ALB security group.

## 4) Configure GitHub Secrets

In `Repository -> Settings -> Secrets and variables -> Actions`, add:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `EC2_HOST` (public IP or DNS of EC2)
- `EC2_USER` (usually `ubuntu`)
- `EC2_SSH_KEY` (private key content, including BEGIN/END lines)

## 5) Deploy through CI/CD

1. Push code to `main`.
2. Workflow `.github/workflows/ci-cd.yml` will:
   - run CI checks
   - build and push API/WEB Docker images to Docker Hub
   - SSH to EC2 and deploy `docker-compose.ec2.yml`

## 6) Get the required public URL for submission

1. Open AWS Console -> EC2 -> Load Balancers.
2. Select your ALB.
3. Copy the **DNS name** value.
4. Final URL format:

```text
http://<your-alb-dns-name>
```

Use this URL as your deployment URL in the experiment submission form.
