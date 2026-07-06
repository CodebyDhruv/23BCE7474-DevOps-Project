![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![Maven](https://img.shields.io/badge/Maven-Build-red)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5)
![Jenkins](https://img.shields.io/badge/Jenkins-CI/CD-D24939)
![Grafana](https://img.shields.io/badge/Grafana-Dashboard-F46800)
![Nagios](https://img.shields.io/badge/Nagios-Monitoring-purple)

# NovaNexus TechFest - DevOps Enabled College Event Website

NovaNexus TechFest is a modern, responsive college technical symposium website developed using Spring Boot and Thymeleaf. The project demonstrates a complete DevOps workflow, including Continuous Integration, Containerization, Kubernetes Deployment, and Infrastructure Monitoring using Jenkins, Docker, Kubernetes, Nagios, Graphite, and Grafana.

---

# Features

- Responsive event website
- Spring MVC architecture
- Thymeleaf template engine
- Spring Boot Actuator
- Docker containerization
- Kubernetes deployment
- Jenkins CI/CD pipeline
- Nagios health monitoring
- Graphite metrics collection
- Grafana dashboards
- Git version control

---

# Technology Stack

### Backend

- Java 21
- Spring Boot 3.x
- Spring MVC
- Spring Boot Actuator
- Thymeleaf

### Frontend

- HTML5
- CSS3
- JavaScript

### DevOps

- Git
- GitHub
- Maven
- Jenkins
- Docker
- Kubernetes (Kind)
- Nagios
- Graphite
- Grafana

---

# Project Structure

```text
novanexus-techfest/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/novanexus/
│   │   │       ├── NovaNexusTechfestApplication.java
│   │   │       └── controller/
│   │   │           └── HomeController.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── templates/
│   │       │   └── index.html
│   │       └── static/
│   │           ├── css/
│   │           ├── js/
│   │           └── images/
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
├── Dockerfile
├── Jenkinsfile
├── pom.xml
└── README.md
```

---

# Application Architecture

```
                Developer
                    │
                    ▼
             GitHub Repository
                    │
            Git Push / Webhook
                    │
                    ▼
                 Jenkins
                    │
        mvn clean package
                    │
                    ▼
            Docker Image Build
                    │
                    ▼
          Docker Container
                    │
                    ▼
             Kubernetes Cluster
                    │
                    ▼
        Spring Boot Application
                    │
      ┌─────────────┼──────────────┐
      │             │              │
      ▼             ▼              ▼
 Spring Actuator Graphite      Nagios
      │             │
      ▼             ▼
          Grafana Dashboard
```

---

# Spring MVC Architecture

The application follows the Spring MVC pattern.

- HomeController maps incoming HTTP requests.
- Thymeleaf renders dynamic HTML templates.
- Static resources are served from the `static` directory.
- Spring Boot Actuator exposes health endpoints.
- No database is required for this project.

---

# Application Routes

| URL | Description |
|------|-------------|
| / | Home Page |
| /#about | About Section |
| /#events | Events |
| /#schedule | Schedule |
| /#speakers | Speakers |
| /#gallery | Gallery |
| /#contact | Contact |
| /actuator | Spring Boot Actuator |
| /actuator/health | Health Endpoint |

---

# Running the Project

Clone the repository

```bash
git clone <repository-url>
cd novanexus-techfest
```

Run using Maven

```bash
mvn spring-boot:run
```

Application

```
http://localhost:8081
```

---

# Build

```bash
mvn clean package
```

The executable JAR is generated inside

```
target/
```

---

# Docker

Build image

```bash
docker build -t novanexus-techfest:v1 .
```

Run container

```bash
docker run -d \
-p 8081:8081 \
--name novanexus-techfest \
novanexus-techfest:v1
```

Verify

```bash
docker ps
```

---

# Kubernetes Deployment

Deploy resources

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Check deployment

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
```

Rollback

```bash
kubectl rollout undo deployment/novanexus-techfest
```

---

# Jenkins CI/CD Pipeline

Pipeline Stages

1. Pull latest source code from GitHub
2. Clean workspace
3. Maven Build
4. Package JAR
5. Build Docker Image
6. Stop existing container
7. Run latest container
8. Verify deployment

Every push to GitHub automatically triggers the Jenkins pipeline.

---

# Monitoring

## Spring Boot Actuator

Health endpoint

```
/actuator/health
```

Metrics endpoint

```
/actuator/metrics
```

---

## Nagios

Monitors

- Application Health
- HTTP Availability
- Host Status

Health Check

```
http://novanexus-techfest:9090/actuator/health
```

---

## Graphite

Collects

- CPU Usage
- Memory Usage
- Disk Usage
- Network Metrics
- JVM Metrics

---

## Grafana

Dashboard Panels

- CPU Usage
- Memory Usage
- Disk Usage
- Network Traffic
- Uptime
- JVM Metrics
- Application Health

---

# DevOps Workflow

```
Developer

↓

Git Commit

↓

Git Push

↓

GitHub

↓

Jenkins Pipeline

↓

Maven Build

↓

Docker Build

↓

Docker Container

↓

Kubernetes Deployment

↓

Spring Boot Application

↓

Spring Actuator

↓

Graphite

↓

Grafana Dashboard

↓

Nagios Monitoring
```

---

# Future Enhancements

- User Authentication
- Event Registration Backend
- Database Integration
- Email Notifications
- Docker Hub Integration
- Cloud Deployment (AWS)

---

# Author

**Dhruv Aggarwal**

B.Tech Computer Science Engineering

VIT-AP University

DevOps Assignment – College Event Website
