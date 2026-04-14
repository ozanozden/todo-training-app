# Todo Training App

A full-stack Todo application built as a hands-on learning project.

## Project Structure

```
todo-training-app/
├── PLAN.md              # Complete implementation plan (4 phases)
├── frontend/            # Next.js + TypeScript application
└── backend/             # Spring Boot + Onion Architecture
```

## Learning Objectives

- **Frontend**: Next.js 16, TypeScript, CSS Modules, Responsive Design, Component Testing
- **Backend**: Spring Boot, Onion Architecture, MySQL, JUnit Testing
- **Security**: OAuth 2.0, JWT, BCrypt, Encryption Techniques
- **CMS**: Contentful integration with GraphQL

## Phases

### Phase 1: Frontend with LocalStorage
- Next.js with TypeScript
- CSS Modules (hand-written, responsive)
- localStorage for data persistence
- Vitest for testing

### Phase 2: Contentful CMS
- Headless CMS integration
- GraphQL queries
- Theme and content management

### Phase 3: Backend with Onion Architecture
- Spring Boot 4.0.2 with Java 21
- Onion Architecture (Domain → Application → Infrastructure → Web)
- MySQL database with Flyway migrations
- Docker for local development

### Phase 4: OAuth 2.0 & JWT Authentication
- OAuth 2.0 with Google & GitHub
- JWT token generation and validation
- BCrypt password hashing
- Secure authentication flow

## Getting Started

See `PLAN.md` for detailed implementation instructions for each phase.

### Phase 1 - Quick Start

```bash
cd frontend
npm create next-app@latest . --typescript --tailwind=false --app --src-dir
npm install
npm run dev
```

## Reference Projects

- `/new-website` - Frontend structure, CSS patterns, testing setup
- `/private/to-do-app-with-login` - Onion Architecture, OAuth2 patterns

## Learning Approach

This is a **hands-on learning project**. You write all code yourself, with guidance and code review support.
