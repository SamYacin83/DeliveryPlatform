# DeliveryPlatform

Application web moderne pour la gestion des commandes et des livraisons, construite avec une architecture Clean Architecture et Domain-Driven Design (DDD).

## Structure du Projet

```
DeliveryPlatform/
├── client/                 # Frontend React/TypeScript
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── contexts/       # Contextes React
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── lib/           # Bibliothèques et configurations
│   │   ├── pages/         # Pages de l'application
│   │   ├── types/         # Définitions TypeScript
│   │   └── utils/         # Utilitaires
├── backend/               # Backend .NET Core
│   ├── src/
│   │   ├── API/          # Couche Présentation
│   │   ├── Application/  # Couche Application
│   │   ├── Domain/       # Couche Domain
│   │   └── Infrastructure/ # Couche Infrastructure
├── pipeline/             # Pipeline CI/CD
├── docs/                 # Documentation
└── scripts/              # Scripts de build et déploiement
```

## Prérequis

### Global
- Git
- Docker Desktop

### Frontend
- Node.js >= 16
- npm >= 8

### Backend
- .NET Core SDK 8.0
- SQL Server ou Azure SQL Database
- Redis (optionnel, pour le cache)

## Technologies Principales

### Frontend
1. **UI et Composants**
   - React avec TypeScript
   - Radix UI (@radix-ui/*)
   - shadcn-ui
   - Tailwind CSS
   - Framer Motion (animations)

2. **État et Data Fetching**
   - @tanstack/react-query
   - React Hook Form avec Zod

3. **Utilitaires**
   - date-fns
   - clsx et class-variance-authority

### Backend
1. **Framework et ORM**
   - ASP.NET Core 8
   - Entity Framework Core
   - MediatR (CQRS)

2. **Base de données et Cache**
   - MySQL
   - Redis

3. **Services Externes**
   - SendGrid (emails)
   - Twilio (SMS)
   - Azure Maps
   - Azure SignalR (notifications)
  
4. **Observabilité et Monitoring**
   - Seq (centralisation et analyse des logs)
   - Jaeger UI (distributed tracing)
   - Métriques d'application (health checks) - à faire
   - Alerting et dashboards

## Installation

1. Cloner le repository
```bash
git clone git clone https://github.com/votre-org/DeliveryPlatform.git
cd DeliveryPlatform
cd DeliveryPlatform
```

2. Configuration Frontend
```bash
cd client
npm install
```

3. Configuration Backend
```bash
cd backend
dotnet restore
```

4. Configuration de l'environnement
- Copier `.env.example` vers `.env`
- Configurer les variables d'environnement nécessaires

## Architecture

### Frontend (React/TypeScript)

L'architecture frontend est organisée en composants modulaires avec une séparation claire des responsabilités :

1. **Components/**
   - Composants UI réutilisables
   - Composants métier
   - Navigation et layout

2. **Pages/**
   - Routes principales de l'application
   - Logique de présentation

3. **Contexts/**
   - État global de l'application
   - Gestion de l'authentification
   - Thème et préférences utilisateur

4. **Hooks/**
   - Logique réutilisable
   - Intégration API
   - Gestion des formulaires

### Backend (Clean Architecture)

L'architecture backend suit les principes du Clean Architecture et DDD :

1. **Couche Présentation (API)**
   - API minimale
   - Middleware d'authentification JWT
   - Validation des requêtes
   - Documentation Swagger
   - Gestion globale des erreurs

2. **Couche Application**
   - Services applicatifs
   - Command/Query Handlers (CQRS)
   - DTOs et mappings
   - Validation métier
   - Gestion des événements domaine

3. **Couche Domain**
   - Entités et agrégats
   - Value Objects
   - Interfaces des repositories
   - Services domaine
   - Événements domaine

4. **Couche Infrastructure**
   - Implémentation des repositories
   - Configuration Entity Framework
   - Intégrations externes
   - Logging et monitoring

## Développement

### Frontend
```bash
cd client
npm run dev
```

### Backend
```bash
cd backend
dotnet run --project src/API/API.csproj
```

## Tests

### Frontend
```bash
cd client
npm test
```

### Backend
```bash
cd backend
dotnet test
```

## Build et Déploiement

### Build
```bash
# Frontend
cd client
npm run build

# Backend
cd backend
dotnet publish -c Release
```

### Docker
```bash
docker-compose up -d
```

## Documentation

- Documentation API : `/swagger`
- Documentation technique : `/docs`
- Guide d'architecture : `/docs/architecture.md`
