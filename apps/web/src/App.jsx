import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const BRAND_NAME = "MyStack Cloud App";

export default function App() {
  const [status, setStatus] = useState("Checking API...");

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        setStatus(data.ok ? `API healthy at ${data.timestamp}` : "API is not healthy");
      } catch {
        setStatus("API not reachable");
      }
    };

    checkApi();
  }, []);

  return (
    <main className="page">
      <section className="hero">
        <p className="badge">Live Deployment Ready</p>
        <h1>{BRAND_NAME}</h1>
        <p className="subtitle">
          A personalized full-stack platform powered by React, Node.js, Docker, CI/CD, and AWS.
        </p>
        <div className="hero-actions">
          <a href="#status" className="btn btn-primary">
            Check System Status
          </a>
          <a href="#stack" className="btn btn-secondary">
            View Technology Stack
          </a>
        </div>
      </section>

      <section id="status" className="card">
        <h2>Application Health</h2>
        <p className="status-text">{status}</p>
      </section>

      <section id="stack" className="card">
        <h2>Current Stack</h2>
        <ul className="stack-list">
          <li>Frontend: React (Vite)</li>
          <li>Backend: Express API</li>
          <li>Production web server: Nginx</li>
          <li>Orchestration: Docker Compose</li>
          <li>Delivery: GitHub Actions + AWS EC2 + ALB</li>
        </ul>
      </section>

      <section className="feature-grid">
        <article className="card feature">
          <h3>Containerized</h3>
          <p>Consistent deployments with Docker images for both API and frontend.</p>
        </article>
        <article className="card feature">
          <h3>Automated Pipeline</h3>
          <p>CI/CD validates, builds, pushes, and deploys your project in one flow.</p>
        </article>
        <article className="card feature">
          <h3>Cloud Hosted</h3>
          <p>Publicly accessible app served through an AWS Application Load Balancer.</p>
        </article>
      </section>
    </main>
  );
}
