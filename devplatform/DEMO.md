# DevPlatform - Live Demo Script

## 🎬 Demo Flow (10 minutes)

### 1. Introduction (1 min)
"DevPlatform is an internal developer platform that accelerates microservice development through automation, observability, and security."

### 2. Service Dashboard (2 min)
**Open:** http://localhost:9000

**Show:**
- ✅ All three services running (Green "ONLINE" badges)
- Real-time metrics (Response time, uptime, status)
- Professional dark UI design

**Say:** "The dashboard provides real-time health monitoring of all microservices. Each service reports its status, uptime, and response time."

### 3. Service Scaffolding Demo (2 min)
```bash
# Create a new service live
./scripts/create-service.sh demo-service node none
cd services/demo-service
tree .
```

**Show:** Complete service structure created in seconds
- Express application with /healthz
- Unit tests
- Dockerfile
- Package.json

**Say:** "With one command, developers get a complete microservice ready to deploy."

### 4. CI/CD Pipeline (2 min)
**Open:** https://github.com/OlabodeGenius/DevPlatform/actions

**Show:**
- GitHub Actions workflow runs
- All checks passing (✅)
- Automated: Lint → Test → Build → Push

**Say:** "Every code push triggers automated testing, security scanning, and Docker image building. Images are tagged with commit SHA for traceability."

### 5. Kubernetes Deployment (1 min)
```bash
kubectl get all -n dev
```

**Show:**
- All pods running (1/1 Ready)
- Services exposed
- Deployments healthy

**Say:** "Services run in isolated Kubernetes namespaces with health checks and resource limits."

### 6. Monitoring & Observability (2 min)
**Open:** http://localhost:9090 (Prometheus)

**Query:** `http_requests_total`

**Show:** Real metrics from all services

**Then open:** http://localhost:3000 (Grafana)

**Show:** Dashboard with visualizations
- Request rate graphs
- Memory usage
- Service uptime

**Say:** "All services expose Prometheus metrics. Grafana provides real-time visualization of performance and health."

### 7. Secrets & Security (1 min)
```bash
# Show secrets exist
kubectl get secrets -n dev

# Show secrets injected into pods
kubectl exec -n dev deployment/orders-api -- env | grep DB_

# Show RBAC restrictions
kubectl auth can-i get secrets -n dev --as=system:serviceaccount:dev:developer
```

**Say:** "Secrets are stored securely in Kubernetes and injected at runtime. RBAC ensures developers have appropriate access levels."

### 8. Conclusion
"DevPlatform demonstrates a complete internal developer platform with:
- Automated service creation
- CI/CD pipelines
- Container orchestration
- Real-time monitoring
- Security best practices"

---

## 🎯 Key Talking Points

- **Time to Deploy:** New service from idea to production in < 5 minutes
- **Automation:** Zero manual configuration for CI/CD
- **Observability:** Built-in metrics from day one
- **Security:** Secrets never in code, RBAC enforced
- **Cost:** $0/month using local infrastructure

