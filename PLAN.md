# Multi-Phase Todo Application Training Project - Implementation Plan

## Context

You're building a full-stack Todo application as a **hands-on learning project** where you will write all the code yourself. This project focuses on:

- **Learning by doing**: You write all code; Claude only reviews and provides guidance
- **Modern tech stack**: Next.js with TypeScript, Spring Boot with Onion Architecture
- **Production-ready patterns**: OAuth 2.0 with JWT, comprehensive testing, responsive design
- **Best practices**: Reusable components, color themes, CSS Modules, encryption techniques

The project will be built progressively across 4 phases:

1. **Phase 1**: Next.js frontend with localStorage (TypeScript, CSS Modules, responsive design)
2. **Phase 2**: Contentful CMS integration for UI constants/content
3. **Phase 3**: Spring Boot backend with MySQL and Onion Architecture
4. **Phase 4**: OAuth 2.0 authentication with JWT tokens and encryption

**Why this approach?** Each phase builds naturally on the previous one, allowing you to understand each technology layer independently before integrating them. This progressive enhancement approach minimizes refactoring and provides clear learning milestones.

**Current workspace context:**
- Location: `/Users/oz.oezden/IdeaProjects/`
- Reference project for structure: `/new-website` (monorepo patterns, CSS Modules, testing setup)
- Reference for architecture: `/private/to-do-app-with-login` (Onion Architecture, OAuth2 structure)
- You will write fresh code but can reference these for patterns and structure

---

## Project Structure

Create new project at: `/Users/oz.oezden/IdeaProjects/todo-training-app/`

Following patterns from `/new-website` for frontend and `/private/to-do-app-with-login` for backend:

```
todo-training-app/
├── frontend/                           # Next.js with TypeScript
│   ├── src/
│   │   ├── app/                       # App Router pages
│   │   │   ├── layout.tsx
│   │   │   ├── layout.css             # Global styles, theme variables
│   │   │   ├── page.tsx               # Home page
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── components/                 # Reusable React components
│   │   │   └── [component]/
│   │   │       ├── Component.tsx
│   │   │       ├── Component.module.css  # CSS Modules per component
│   │   │       ├── Component.spec.tsx    # Component tests
│   │   │       └── types.ts
│   │   ├── hooks/                      # Custom React hooks
│   │   │   ├── useTodos.ts
│   │   │   └── useAuth.ts
│   │   ├── services/                   # Data access layer
│   │   │   ├── localStorage.ts         # Phase 1
│   │   │   ├── contentful.ts           # Phase 2
│   │   │   └── api.ts                  # Phase 3-4
│   │   ├── types/                      # TypeScript type definitions
│   │   │   ├── todo.ts
│   │   │   └── user.ts
│   │   ├── constants/                  # Theme and app constants
│   │   │   ├── theme.ts                # Color themes, breakpoints
│   │   │   └── contentful.ts           # Phase 2
│   │   └── utils/                      # Utility functions
│   ├── test/
│   │   └── setup.ts                    # Vitest setup
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts                  # Vitest configuration
│   ├── .env.local                      # Environment variables
│   └── README.md
│
└── backend/                             # Spring Boot with Onion Architecture
    ├── src/
    │   ├── main/
    │   │   ├── java/com/training/todoapp/
    │   │   │   ├── domain/             # Layer 1: Domain (Core)
    │   │   │   │   ├── Todo.java       # Domain entity
    │   │   │   │   └── User.java       # Domain entity
    │   │   │   ├── application/        # Layer 2: Application (Use Cases)
    │   │   │   │   ├── service/
    │   │   │   │   │   ├── TodoService.java
    │   │   │   │   │   └── UserService.java
    │   │   │   │   ├── repository/     # Port interfaces
    │   │   │   │   │   ├── TodoRepository.java
    │   │   │   │   │   └── UserRepository.java
    │   │   │   │   ├── security/       # Security port
    │   │   │   │   │   └── PasswordEncoder.java
    │   │   │   │   └── exception/      # Application exceptions
    │   │   │   ├── db/                 # Layer 3: Infrastructure (Adapters)
    │   │   │   │   ├── todo/
    │   │   │   │   │   ├── TodoRepositoryDAO.java      # Spring Data JPA
    │   │   │   │   │   └── TodoRepositoryImpl.java     # Adapter
    │   │   │   │   └── user/
    │   │   │   │       ├── UserRepositoryDAO.java
    │   │   │   │       └── UserRepositoryImpl.java
    │   │   │   ├── security/           # Layer 3: Security Infrastructure
    │   │   │   │   ├── jwt/
    │   │   │   │   │   ├── JwtService.java
    │   │   │   │   │   └── JwtAuthenticationFilter.java
    │   │   │   │   ├── oauth2/         # OAuth2 handlers (Phase 4)
    │   │   │   │   ├── BCryptPasswordEncoderAdapter.java
    │   │   │   │   └── CustomUserDetailsService.java
    │   │   │   ├── web/                # Layer 4: Presentation
    │   │   │   │   ├── controller/
    │   │   │   │   │   ├── AuthController.java
    │   │   │   │   │   ├── TodoController.java
    │   │   │   │   │   └── UserController.java
    │   │   │   │   ├── dto/
    │   │   │   │   │   ├── TodoResponse.java
    │   │   │   │   │   ├── CreateTodoRequest.java
    │   │   │   │   │   ├── LoginRequest.java
    │   │   │   │   │   └── RegistrationRequest.java
    │   │   │   │   └── exception/
    │   │   │   │       └── GlobalExceptionHandler.java
    │   │   │   ├── config/             # Configuration
    │   │   │   │   ├── SecurityConfig.java
    │   │   │   │   └── WebConfig.java
    │   │   │   └── constants/          # Centralized constants
    │   │   └── resources/
    │   │       ├── application.yml
    │   │       └── db/migration/       # Flyway migrations
    │   │           ├── V1__create_users_table.sql
    │   │           └── V2__create_todos_table.sql
    │   └── test/
    │       └── java/com/training/todoapp/
    │           ├── domain/             # Domain tests
    │           ├── application/        # Service tests
    │           └── web/                # Controller tests
    ├── build.gradle
    ├── docker-compose.yml
    └── README.md
```

**Key Architectural Decisions:**
- **Frontend**: Component-based with CSS Modules, following `/new-website` patterns
- **Backend**: Onion Architecture with clear layer separation, following `/private/to-do-app-with-login`
- **Testing**: Vitest for frontend, JUnit 5 + Mockito for backend
- **Styling**: Hand-written CSS Modules with theme variables, responsive breakpoints (600px, 960px, 1310px)

---

## Phase 1: Next.js Frontend with LocalStorage

### Overview
Build a client-side only Todo app with Next.js, TypeScript, and browser localStorage for persistence. **You will write all code yourself** - this phase focuses on learning TypeScript, React patterns, CSS Modules, and responsive design.

### Key Implementation Details

**Technology Stack:**
- Next.js 16.x (App Router) - following `/new-website` version
- TypeScript 5.x with strict mode
- React 19
- **CSS Modules** (hand-written, no Tailwind)
- Vitest + Testing Library for component tests

**Core TypeScript Types** (`/frontend/src/types/todo.ts`):
```typescript
export interface Todo {
  id: string;           // UUID for Phase 1
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Service Layer Pattern** (`/frontend/src/services/localStorage.ts`):
- `getTodos()`: Read from localStorage
- `saveTodos(todos)`: Write to localStorage
- `addTodo(formData)`: Create new todo
- `updateTodo(id, updates)`: Update existing
- `deleteTodo(id)`: Remove todo
- `toggleTodo(id)`: Toggle done status

**Critical Design Decisions:**
1. **Service Layer Abstraction**: Phase 3 transition only requires swapping the service implementation (localStorage → API calls) without touching components
2. **Reusable Components**: Build components that can be composed and reused
3. **Theme System**: Define color themes and CSS variables upfront for consistency
4. **Responsive First**: Mobile-first CSS with breakpoints at 600px (tablet), 960px (desktop), 1310px (large desktop)

**Component Architecture:**
```
App (page.tsx)
└── TodoList (client component)
    ├── TodoForm (create new todos)
    └── TodoItem[] (display, toggle, delete)
```

Each component follows the pattern from `/new-website`:
```
components/todo/
├── Todo.tsx                    # Main component
├── todo.module.css            # Component-scoped styles (hand-written)
├── Todo.spec.tsx              # Vitest tests
└── types.ts                   # Component-specific types
```

**Custom Hook** (`/frontend/src/hooks/useTodos.ts`):
Encapsulates all todo operations and state management. Components use this hook instead of direct service calls.

**Theme System** (`/frontend/src/constants/theme.ts`):
```typescript
export const COLORS = {
  primary: '#0066cc',
  primaryHover: '#0052a3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  background: '#ffffff',
  backgroundAlt: '#f8f9fa',
  text: '#212529',
  textLight: '#6c757d',
  border: '#dee2e6',
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 600,
  desktop: 960,
  largeDesktop: 1310,
};
```

**Global CSS Variables** (`/frontend/src/app/layout.css`):
```css
:root {
  /* Colors */
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-background: #ffffff;
  --color-text: #212529;
  --color-border: #dee2e6;

  /* Spacing */
  --spacing: 16px;
  --spacing-2: 8px;
  --spacing-4: 32px;
  --spacing-8: 64px;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --line-height: 1.5;

  /* Layout */
  --max-content-width: 1200px;
  --border-radius: 8px;
}
```

**CSS Modules Pattern** (example `todo.module.css`):
```css
/* BEM naming within module */
.todo {
  padding: var(--spacing);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
}

.todo__title {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.todo__checkbox {
  margin-right: var(--spacing-2);
}

.todo--completed {
  opacity: 0.6;
  text-decoration: line-through;
}

/* Responsive breakpoints */
@media screen and (min-width: 600px) {
  .todo {
    padding: var(--spacing-2);
  }
}

@media screen and (min-width: 960px) {
  .todo {
    max-width: 800px;
    margin: 0 auto;
  }
}
```

**Dummy Data Strategy:**
Initialize localStorage with 3-5 sample todos on first load to demonstrate UI functionality immediately.

### Component Testing with Vitest

**Test Setup** (`/frontend/test/setup.ts`):
```typescript
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
afterEach(() => cleanup());

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

**Example Component Test** (`Todo.spec.tsx`):
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from './Todo';

describe('Todo', () => {
  it('should render todo with title and description', () => {
    const todo = { id: '1', title: 'Test', description: 'Desc', done: false };
    render(<Todo todo={todo} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('should call onToggle when checkbox clicked', () => {
    const onToggle = vi.fn();
    const todo = { id: '1', title: 'Test', description: 'Desc', done: false };
    render(<Todo todo={todo} onToggle={onToggle} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('should apply completed styles when done is true', () => {
    const todo = { id: '1', title: 'Test', description: 'Desc', done: true };
    const { container } = render(<Todo todo={todo} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(container.firstChild).toHaveClass('todo--completed');
  });
});
```

### Manual Testing Checklist
- [ ] Create todo with title and description
- [ ] Mark todo as done/undone
- [ ] Delete todo
- [ ] Refresh page - todos persist
- [ ] Inspect localStorage in browser DevTools
- [ ] Test with empty localStorage (first load)
- [ ] Test responsive design (mobile 320px, tablet 768px, desktop 1024px)
- [ ] Test theme colors render correctly
- [ ] Run `npm test` - all component tests pass

### Deliverables
- Working Next.js app on `http://localhost:3000`
- All CRUD operations functional
- Data persists across page refreshes
- Clean TypeScript types
- Service layer abstraction ready for Phase 3

### Critical Files
- `/frontend/src/types/todo.ts`
- `/frontend/src/services/localStorage.ts`
- `/frontend/src/hooks/useTodos.ts`
- `/frontend/src/components/TodoList.tsx`
- `/frontend/src/components/TodoForm.tsx`
- `/frontend/src/components/TodoItem.tsx`

---

## Phase 2: Contentful CMS Integration

### Overview
Fetch UI constants, labels, and static content from Contentful CMS. Todo storage remains in localStorage.

### Contentful Setup

**Account Setup:**
1. Sign up at https://www.contentful.com/sign-up/ (free tier)
2. Create new Space: "Todo App Training"
3. Obtain: Space ID, Content Delivery API key

**Content Model:**
Create content type "AppConstants" with fields:
- `key` (Short text, required, unique) - e.g., "app_title"
- `value` (Short text, required)
- `description` (Long text, optional) - documentation

**Sample Entries:**
- `app_title` → "My Todo Training App"
- `add_todo_button` → "Add New Task"
- `empty_state_message` → "No todos yet. Create your first one!"

### Implementation Approach

**Install SDK:**
```bash
npm install contentful
```

**Environment Variables** (`/frontend/.env.local`):
```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

**Service Layer** (`/frontend/src/services/contentful.ts`):
- `getAppConstants()`: Fetch all constants, return as key-value object
- `getConstantByKey(key)`: Fetch single constant

**Constants Loader** (`/frontend/src/constants/contentful.ts`):
- Define `DEFAULT_CONSTANTS` object with fallback values
- Implement `loadConstants()` with caching and error handling
- Merge Contentful data with defaults (Contentful overrides defaults)

**Integration Pattern:**
Use Next.js Server Components to fetch constants at page load:

```typescript
// /frontend/src/app/page.tsx
export default async function Home() {
  const constants = await loadConstants();
  return <TodoList constants={constants} />;
}
```

**Alternative**: Use GraphQL directly via `graphql-request` package for more control (advanced option).

### Testing Checklist
- [ ] Verify Contentful API credentials work
- [ ] Create sample content in Contentful UI
- [ ] Frontend displays Contentful constants
- [ ] Fallback values work when Contentful unavailable
- [ ] Update content in Contentful, verify UI reflects changes (no code deploy needed)

### Deliverables
- Contentful account configured
- Content model created with sample data
- Frontend fetches and displays Contentful content
- Graceful fallback to defaults
- Caching strategy implemented

### Critical Files
- `/frontend/.env.local`
- `/frontend/src/services/contentful.ts`
- `/frontend/src/constants/contentful.ts`
- Updated `/frontend/src/app/page.tsx`

---

## Phase 3: Spring Boot Backend with MySQL and Onion Architecture

### Overview
Create a Spring Boot backend following **Onion Architecture** principles with MySQL database, replacing localStorage. Implement multi-user support where each todo belongs to a user. **You will write all backend code yourself**, learning clean architecture, Spring Boot, and database design.

### Onion Architecture Overview

**Dependency Flow (Inside ← Outside):**
```
Domain Layer (Core, no dependencies)
    ↑
Application Layer (depends only on Domain)
    ↑
Infrastructure Layer (implements Application interfaces)
    ↑
Web/Presentation Layer (depends on Application)
```

**Key Principle:** Inner layers define interfaces (ports), outer layers provide implementations (adapters). This allows swapping implementations without changing business logic.

### Technology Stack
- Spring Boot 4.0.2
- Java 21
- Gradle 8.x
- MySQL 8.0 in Docker
- Spring Data JPA + Hibernate
- Flyway migrations
- Lombok

### Database Schema

**Migration V1** - Users table:
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Test users for Phase 3
INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com');
```

**Migration V2** - Todos table:
```sql
CREATE TABLE todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_user_id (user_id),
    INDEX idx_user_done (user_id, done)
);
```

**Note:** Added `description` field (not in original `/private/to-do-app-with-login` schema).

### Layer 1: Domain Layer (Core Business Logic)

**Location:** `/backend/src/main/java/com/training/todoapp/domain/`

**Principles:**
- Pure business logic, no framework dependencies (except JPA annotations)
- Domain entities own their business rules
- No knowledge of outer layers (databases, web, etc.)

**User Entity** (`User.java`):
```java
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Business rule: equals based on ID only (DDD)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
```

**Todo Entity** (`Todo.java`):
```java
@Entity
@Table(name = "todos")
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Boolean done;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Business methods (domain logic)
    public void toggleDone() {
        this.done = !this.done;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateTitle(String newTitle) {
        if (newTitle == null || newTitle.trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }
        this.title = newTitle;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateDescription(String newDescription) {
        this.description = newDescription;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (done == null) done = false;
    }
}
```

### Layer 2: Application Layer (Use Cases & Orchestration)

**Location:** `/backend/src/main/java/com/training/todoapp/application/`

**Principles:**
- Defines what the application does (use cases)
- Defines ports (interfaces) for infrastructure
- No knowledge of how ports are implemented
- Orchestrates domain entities

**Port Interfaces** (`application/repository/`):

```java
// TodoRepository.java - Port (interface)
public interface TodoRepository {
    Todo save(Todo todo);
    Optional<Todo> findById(Long id);
    List<Todo> findByUserId(Long userId);
    void delete(Todo todo);
}

// UserRepository.java - Port (interface)
public interface UserRepository {
    User save(User user);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
```

**Service Layer** (`application/service/`):

```java
// TodoService.java
@Service
@Transactional
public class TodoService {
    private final TodoRepository todoRepository; // Depends on port, not implementation

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo createTodo(Long userId, String title, String description) {
        Todo todo = Todo.builder()
            .userId(userId)
            .title(title)
            .description(description)
            .done(false)
            .build();
        return todoRepository.save(todo);
    }

    public List<Todo> getTodosByUser(Long userId) {
        return todoRepository.findByUserId(userId);
    }

    public Todo toggleTodo(Long todoId, Long userId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        // Authorization: verify ownership
        if (!todo.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized");
        }

        todo.toggleDone(); // Domain method
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long todoId, Long userId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        if (!todo.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized");
        }

        todoRepository.delete(todo);
    }
}
```

### Layer 3: Infrastructure Layer (Adapters)

**Location:** `/backend/src/main/java/com/training/todoapp/db/`

**Principles:**
- Implements ports defined by Application layer
- Contains technical details (JPA, Spring Data, etc.)
- Adapts external frameworks to application needs

**Spring Data JPA Interfaces:**

```java
// TodoRepositoryDAO.java - Spring Data JPA interface
public interface TodoRepositoryDAO extends JpaRepository<Todo, Long> {
    List<Todo> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Todo> findByIdAndUserId(Long id, Long userId);
}

// UserRepositoryDAO.java
public interface UserRepositoryDAO extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
```

**Repository Adapters (Implement Application Ports):**

```java
// TodoRepositoryImpl.java - Adapter
@Component
public class TodoRepositoryImpl implements TodoRepository {
    private final TodoRepositoryDAO dao;

    public TodoRepositoryImpl(TodoRepositoryDAO dao) {
        this.dao = dao;
    }

    @Override
    public Todo save(Todo todo) {
        return dao.save(todo);
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return dao.findById(id);
    }

    @Override
    public List<Todo> findByUserId(Long userId) {
        return dao.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public void delete(Todo todo) {
        dao.delete(todo);
    }
}

// UserRepositoryImpl.java - Adapter (similar pattern)
@Repository
public class UserRepositoryImpl implements UserRepository {
    private final UserRepositoryDAO dao;
    // ... implement all methods
}
```

**Key Pattern**: Application layer depends on `TodoRepository` interface, not `TodoRepositoryImpl`. Spring's dependency injection wires the implementation.

### Service Layer

**TodoService** (`/backend/.../service/TodoService.java`):
- `createTodo(userId, title, description)`
- `getTodosByUser(userId)`
- `toggleTodo(todoId, userId)`
- `deleteTodo(todoId, userId)`
- `updateTodo(todoId, userId, title, description)`

**Important**: All methods accept `userId` parameter to ensure proper data isolation.

### REST API Design

**Endpoints:**
```
GET    /api/todos?userId={id}           # Get all todos for user
POST   /api/todos                        # Create new todo
PATCH  /api/todos/{id}/toggle            # Toggle done status
PUT    /api/todos/{id}                   # Update todo
DELETE /api/todos/{id}?userId={userId}  # Delete todo
```

**CORS Configuration**: Allow `http://localhost:3000` (Next.js dev server)

**DTOs:**
- `CreateTodoRequest`: userId, title, description
- `TodoResponse`: id, title, description, done, createdAt, updatedAt
- Use `@Valid` for request validation

### Docker Setup

**MySQL Configuration** (`/backend/docker-compose.yml`):
```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: todo-training-mysql
    environment:
      MYSQL_DATABASE: todoapp
      MYSQL_USER: todouser
      MYSQL_PASSWORD: todopassword
    ports:
      - "3307:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
```

**Start command:** `docker-compose up -d`

### Frontend Integration

**API Service** (`/frontend/src/services/api.ts`):
Replace localStorage with REST API calls:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
const CURRENT_USER_ID = 1; // Hardcoded for Phase 3

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos?userId=${CURRENT_USER_ID}`);
  return response.json();
}

export async function createTodo(title: string, description: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: CURRENT_USER_ID, title, description }),
  });
  return response.json();
}
// ... other methods
```

**Hook Update** (`/frontend/src/hooks/useTodos.ts`):
Change from localStorage service to API service. Add error handling and loading states.

### Testing Checklist
- [ ] MySQL container running on port 3307
- [ ] Flyway migrations applied successfully
- [ ] Test API with Postman/Insomnia (create, read, update, delete)
- [ ] Verify foreign key constraints work
- [ ] Frontend fetches todos from backend
- [ ] CORS configured correctly
- [ ] Create todos for user 1, verify user 2 cannot see them
- [ ] Test error handling (backend down, invalid data)

### Deliverables
- Spring Boot backend running on `http://localhost:8080`
- MySQL database in Docker
- Full CRUD REST API
- Frontend connected to backend
- Multi-user support (with hardcoded userId)
- Database schema managed by Flyway

### Critical Files
- `/backend/build.gradle`
- `/backend/docker-compose.yml`
- `/backend/src/main/resources/db/migration/V1__create_users_table.sql`
- `/backend/src/main/resources/db/migration/V2__create_todos_table.sql`
- `/backend/src/main/java/com/training/todoapp/domain/Todo.java`
- `/backend/src/main/java/com/training/todoapp/domain/User.java`
- `/backend/src/main/java/com/training/todoapp/db/todo/TodoRepositoryDAO.java`
- `/backend/src/main/java/com/training/todoapp/application/service/TodoService.java`
- `/backend/src/main/java/com/training/todoapp/web/controller/TodoController.java`
- `/backend/src/main/resources/application.yml`
- `/frontend/src/services/api.ts` (updated)

---

## Phase 4: OAuth 2.0 Authentication with JWT

### Overview
Implement **OAuth 2.0** authentication (Google, GitHub) with **JWT tokens** for the Spring Boot backend. Learn encryption techniques for secure password storage and token generation. **You will write all authentication code yourself**, learning OAuth 2.0 flows, JWT standards, and cryptographic best practices.

### Learning Objectives
1. **OAuth 2.0 Flow**: Authorization Code Grant with PKCE
2. **JWT Tokens**: Structure, signing, validation, expiration
3. **Encryption Techniques**:
   - BCrypt for password hashing (adaptive, slow)
   - HMAC-SHA256 for JWT signing
   - Understanding cryptographic salts and key derivation
4. **Security Patterns**: Token refresh, secure cookie handling, CORS

### Reference Architecture
Use `/private/to-do-app-with-login` as reference for:
- Onion architecture integration of security layer
- JWT service structure
- Spring Security configuration patterns
- **Do NOT copy code** - understand and implement yourself

### Backend Implementation

**Dependencies** (add to build.gradle):
```gradle
// Spring Security
implementation 'org.springframework.boot:spring-boot-starter-security'
implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'

// JWT
implementation 'io.jsonwebtoken:jjwt-api:0.12.3'
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.3'
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.3'
```

### Encryption Techniques to Learn

**1. BCrypt Password Hashing:**
```java
// BCryptPasswordEncoderAdapter.java (Infrastructure layer)
@Component
public class BCryptPasswordEncoderAdapter implements PasswordEncoder {
    private final BCryptPasswordEncoder encoder;

    public BCryptPasswordEncoderAdapter() {
        this.encoder = new BCryptPasswordEncoder(10); // 2^10 rounds = ~100ms
    }

    @Override
    public String encode(String plainPassword) {
        // BCrypt automatically generates salt
        // Result: $2a$10$[22-char salt][31-char hash]
        return encoder.encode(plainPassword);
    }

    @Override
    public boolean matches(String plainPassword, String hashedPassword) {
        // Constant-time comparison (prevents timing attacks)
        return encoder.matches(plainPassword, hashedPassword);
    }
}
```

**Why BCrypt?**
- Adaptive: can increase rounds as hardware gets faster
- Built-in salt generation (prevents rainbow table attacks)
- Slow by design (prevents brute force)

**2. JWT Token Generation (HMAC-SHA256):**
```java
// JwtService.java (Infrastructure layer)
@Service
public class JwtService {
    private final String SECRET_KEY; // 256-bit key from config
    private final long EXPIRATION_MS = 86400000; // 24 hours

    public String generateToken(String username) {
        // Header: {alg: "HS256", typ: "JWT"}
        // Payload: {sub: username, iat: now, exp: now+24h}
        // Signature: HMAC-SHA256(base64(header).base64(payload), SECRET_KEY)

        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
```

**Why HMAC-SHA256?**
- Symmetric: same key for signing and validation (fast)
- Secure: SHA-256 is cryptographically strong
- Standard: widely supported JWT algorithm

**3. Secure Token Storage (Frontend):**
```typescript
// DO: HttpOnly cookies (immune to XSS)
// DON'T: localStorage (vulnerable to XSS)

// Backend sets cookie:
response.addHeader("Set-Cookie",
    "token=" + jwt + "; HttpOnly; Secure; SameSite=Strict; Max-Age=86400");
```

**Migration V3** - Add authentication and OAuth fields:
```sql
ALTER TABLE users
    ADD COLUMN password VARCHAR(255),                          -- BCrypt hash (nullable for OAuth users)
    ADD COLUMN enabled BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN auth_provider VARCHAR(50) DEFAULT 'LOCAL',      -- LOCAL, GOOGLE, GITHUB
    ADD COLUMN oauth_id VARCHAR(255),                          -- OAuth provider user ID
    ADD COLUMN profile_image_url VARCHAR(500);                 -- OAuth profile picture

-- Create unique index on oauth_provider + oauth_id
CREATE UNIQUE INDEX idx_oauth ON users(auth_provider, oauth_id);

-- Update test users with BCrypt hashed "password123"
UPDATE users SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE username IN ('john_doe', 'jane_smith');
```

**JWT Service** (`/backend/.../security/jwt/JwtService.java`):
Copy from `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/security/jwt/JwtService.java`

Key methods:
- `generateToken(username)`: Create JWT with 24-hour expiration
- `extractUsername(token)`: Parse username from token
- `isTokenValid(token, userDetails)`: Validate token
- Secret key: 256-bit, configurable via environment variable

**JWT Authentication Filter** (`/backend/.../security/jwt/JwtAuthenticationFilter.java`):
Copy from reference project. Intercepts requests, validates JWT, sets Spring Security context.

**Security Configuration** (`/backend/.../security/SecurityConfig.java`):
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/todos/**").authenticated()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**Auth Controller** (`/backend/.../web/controller/AuthController.java`):
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest request) {
        // Check username/email uniqueness
        // Hash password with BCrypt
        // Save user
        // Generate JWT token
        // Return token + user details
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        // Authenticate with AuthenticationManager
        // Generate JWT token
        // Return token + user details
    }
}
```

**Update Todo Controller**:
Replace `@RequestParam Long userId` with `@AuthenticationPrincipal UserDetails userDetails`:

```java
@GetMapping
public ResponseEntity<List<TodoResponse>> getTodos(
    @AuthenticationPrincipal UserDetails userDetails
) {
    Long userId = getUserId(userDetails); // Helper method
    // ... rest of method
}
```

**OAuth2 Configuration** (`application.yml`):
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            scope:
              - email
              - profile
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"

          github:
            client-id: ${GITHUB_CLIENT_ID}
            client-secret: ${GITHUB_CLIENT_SECRET}
            scope:
              - user:email
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"

app:
  jwt:
    secret: ${JWT_SECRET:must-be-256-bit-key-in-production}
    expiration-ms: 86400000        # 24 hours
    refresh-expiration-ms: 604800000  # 7 days

  oauth2:
    authorized-redirect-uris:
      - http://localhost:3000/oauth2/redirect
```

**OAuth2 Success Handler:**
```java
// OAuth2AuthenticationSuccessHandler.java (Infrastructure layer)
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Extract user info from OAuth provider
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getName();
        String provider = // determine from authentication

        // Find or create user in database
        User user = userService.findOrCreateOAuthUser(email, name, provider, providerId);

        // Generate JWT token
        String token = jwtService.generateToken(user.getUsername());

        // Redirect to frontend with token
        String redirectUrl = String.format(
            "http://localhost:3000/oauth2/redirect?token=%s",
            token
        );
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
```

### Frontend Implementation

**Auth Service** (`/frontend/src/services/auth.ts`):
```typescript
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();

  // Store token in localStorage
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }));

  return data;
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}
```

**Update API Service** (`/frontend/src/services/api.ts`):
Add Authorization header to all requests:
```typescript
function getHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    headers: getHeaders(),
  });
  if (response.status === 401) {
    window.location.href = '/login'; // Redirect if unauthorized
  }
  return response.json();
}
```

**Auth Hook** (`/frontend/src/hooks/useAuth.ts`):
```typescript
export function useAuth() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    setUser({ username: response.username, email: response.email });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, isAuthenticated: !!user, login, logout };
}
```

**Login Component** (`/frontend/src/components/LoginForm.tsx`):
Form with username/password fields, calls `useAuth().login()`, redirects to home on success.

**Protected Routes** (`/frontend/src/app/page.tsx`):
```typescript
export default function Home() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <main>
      <header>
        <span>Welcome, {user?.username}</span>
        <button onClick={logout}>Logout</button>
      </header>
      <TodoList />
    </main>
  );
}
```

### Backend Testing Requirements

**Domain Layer Tests:**
```java
// UserTest.java
@Test
void shouldHashPasswordWithBCrypt() {
    // Test that passwords are hashed, not stored in plain text
}

@Test
void shouldNotIncludePasswordInToString() {
    // Security: toString should exclude password
}
```

**Application Layer Tests:**
```java
// TodoServiceTest.java
@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @Test
    void shouldCreateTodoForUser() {
        // Given
        Todo todo = Todo.builder().title("Test").userId(1L).build();
        when(todoRepository.save(any())).thenReturn(todo);

        // When
        Todo created = todoService.createTodo(1L, "Test", "Description");

        // Then
        assertThat(created.getTitle()).isEqualTo("Test");
        verify(todoRepository).save(any(Todo.class));
    }

    @Test
    void shouldThrowExceptionWhenUnauthorizedUserTriesToToggle() {
        // Authorization test
    }
}
```

**Web Layer Tests:**
```java
// TodoControllerTest.java
@WebMvcTest(TodoController.class)
class TodoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

    @Test
    @WithMockUser(username = "john_doe")
    void shouldCreateTodoWhenAuthenticated() throws Exception {
        mockMvc.perform(post("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "title": "Test Todo",
                    "description": "Test Description"
                }
                """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("Test Todo"));
    }

    @Test
    void shouldReturn401WhenNotAuthenticated() throws Exception {
        mockMvc.perform(get("/api/todos"))
            .andExpect(status().isUnauthorized());
    }
}
```

**Security Tests:**
```java
// JwtServiceTest.java
@Test
void shouldGenerateValidJwtToken() {
    String token = jwtService.generateToken("john_doe");

    assertThat(token).isNotNull();
    assertThat(jwtService.extractUsername(token)).isEqualTo("john_doe");
    assertThat(jwtService.isTokenValid(token, "john_doe")).isTrue();
}

@Test
void shouldRejectExpiredToken() {
    // Test with manipulated expiration time
}

@Test
void shouldRejectTokenWithInvalidSignature() {
    // Test with modified token
}
```

### Manual Testing Checklist
- [ ] Register new user via API
- [ ] Login with username/password, receive JWT
- [ ] Login with Google OAuth
- [ ] Login with GitHub OAuth
- [ ] Verify JWT payload contains correct username and expiration
- [ ] API requests with valid JWT succeed
- [ ] Logged-in user sees only their todos
- [ ] Logged-out user redirected to login
- [ ] Invalid/expired token returns 401
- [ ] Password stored as BCrypt hash in database (check with SQL query)
- [ ] Multiple users have isolated todo lists
- [ ] CORS configured correctly for authenticated requests
- [ ] Token refresh works before expiration
- [ ] Run all backend tests: `./gradlew test`
- [ ] Run all frontend tests: `npm test`

### Deliverables
- JWT authentication fully implemented
- User registration and login working
- Protected routes in frontend
- Each user has isolated todo list
- Secure password storage (BCrypt)
- Token-based authorization
- Logout functionality

### Critical Files
- `/backend/src/main/resources/db/migration/V3__add_authentication_to_users.sql`
- `/backend/src/main/java/com/training/todoapp/security/jwt/JwtService.java`
- `/backend/src/main/java/com/training/todoapp/security/jwt/JwtAuthenticationFilter.java`
- `/backend/src/main/java/com/training/todoapp/security/oauth2/OAuth2AuthenticationSuccessHandler.java`
- `/backend/src/main/java/com/training/todoapp/security/SecurityConfig.java`
- `/backend/src/main/java/com/training/todoapp/security/CustomUserDetailsService.java`
- `/backend/src/main/java/com/training/todoapp/security/BCryptPasswordEncoderAdapter.java`
- `/backend/src/main/java/com/training/todoapp/web/controller/AuthController.java`
- Updated `/backend/src/main/java/com/training/todoapp/web/controller/TodoController.java`
- `/frontend/src/services/auth.ts`
- `/frontend/src/hooks/useAuth.ts`
- `/frontend/src/components/LoginForm.tsx`
- Updated `/frontend/src/services/api.ts`
- `/frontend/src/app/login/page.tsx`

---

## Claude's Role: Code Review & Guidance Only

Throughout this project, **you will write all code yourself**. This is a learning project where the goal is hands-on experience.

**What Claude Does:**
- ✅ **Review** your code for correctness and best practices
- ✅ **Suggest improvements** based on patterns and architecture
- ✅ **Explain concepts** (OAuth flow, JWT structure, Onion Architecture, etc.)
- ✅ **Help debug** issues when you're stuck
- ✅ **Validate** architectural decisions
- ✅ **Run tests** and verify functionality
- ✅ **Answer questions** about implementation details
- ✅ **Provide examples** from reference projects when needed

**What Claude Does NOT Do:**
- ❌ Write implementation code for you
- ❌ Generate complete components or services
- ❌ Create boilerplate automatically
- ❌ Implement features end-to-end

**Iterative Learning Process:**
1. **You write code** following the patterns and structure in this plan
2. **Claude reviews** and provides specific feedback
3. **You refactor** based on feedback
4. **Test together** to verify functionality
5. **Repeat** until the feature is working, tested, and follows best practices

**When to Ask Claude:**
- "Can you review this component I wrote?"
- "I'm getting this error, can you help me understand why?"
- "Is this the right way to implement the repository pattern?"
- "Can you explain how OAuth redirect URIs work?"
- "Does my test cover the right scenarios?"

**When You Should Code First:**
- Creating new components
- Writing service methods
- Implementing business logic
- Building UI layouts
- Writing CSS
- Setting up configuration files

---

## Summary & Next Steps

This plan provides a comprehensive roadmap for building a production-ready Todo application with modern technologies and best practices.

**Key Takeaways:**
1. **Progressive Enhancement**: Each phase builds on the previous, minimizing rework
2. **Hands-On Learning**: You write all code to deeply understand each concept
3. **Production Patterns**: OAuth 2.0, JWT, Onion Architecture, comprehensive testing
4. **Modern Stack**: Next.js 16, TypeScript, Spring Boot 4, MySQL, Docker
5. **Best Practices**: Responsive CSS Modules, reusable components, security-first design

**Getting Started (Phase 1):**
1. Create project directory: `/Users/oz.oezden/IdeaProjects/todo-training-app/`
2. Initialize Next.js frontend with TypeScript
3. Set up Vitest for testing
4. Create theme constants and global CSS
5. Build first component (TodoList)
6. Write component tests
7. Implement localStorage service
8. Test end-to-end functionality

**Ready to Begin?**
When you're ready to start Phase 1, create the initial Next.js project and Claude will review your setup and guide you through building the first components.

---

## Verification Strategy

### End-to-End Verification (All Phases Complete)

1. **Start all services:**
   ```bash
   # Terminal 1: MySQL
   cd backend && docker-compose up -d

   # Terminal 2: Spring Boot
   cd backend && ./gradlew bootRun

   # Terminal 3: Next.js
   cd frontend && npm run dev
   ```

2. **Test complete user flow:**
   - Navigate to `http://localhost:3000`
   - Should redirect to `/login` (not authenticated)
   - Register new user account
   - Login with credentials
   - Create several todos
   - Mark some as done
   - Edit todo descriptions
   - Delete a todo
   - Logout
   - Verify redirected to login
   - Login again - todos persist
   - Register second user - has empty todo list (isolation working)

3. **Verify Contentful integration:**
   - Update app title in Contentful UI
   - Refresh Next.js page
   - Verify new title appears (no code deploy needed)

4. **Verify database state:**
   ```bash
   docker exec -it todo-training-mysql mysql -u todouser -p
   # Password: todopassword
   USE todoapp;
   SELECT * FROM users;
   SELECT * FROM todos;
   ```

### Testing Each Phase Independently

**Phase 1 Verification:**
- Open browser DevTools → Application → Local Storage
- Create todos, verify JSON structure
- Refresh page, todos persist

**Phase 2 Verification:**
- Check Contentful Space in web UI
- Verify constants loaded at runtime
- Test with Contentful unavailable (fallback to defaults)

**Phase 3 Verification:**
- Use Postman/Insomnia to test API endpoints
- Check MySQL database directly
- Test CORS with frontend requests
- Verify multi-user isolation (user 1 cannot access user 2 todos)

**Phase 4 Verification:**
- Test registration/login via Postman
- Inspect JWT token (jwt.io)
- Test protected endpoints without token (should return 401)
- Verify password hashed in database

---

## Key Design Patterns & Best Practices

### Service Layer Abstraction (Phase 1 → Phase 3)
By implementing a service layer in Phase 1, the transition to backend API in Phase 3 only requires swapping the service implementation. Components remain unchanged.

### Repository Pattern (Phase 3-4)
Spring Data JPA repositories provide clean data access abstraction. Custom query methods (`findByUserIdAndDone`) keep controllers simple.

### DTO Pattern (Phase 3-4)
Data Transfer Objects separate API contracts from internal entities. This allows entity changes without breaking API.

### Custom Hooks (All Phases)
React hooks (`useTodos`, `useAuth`) encapsulate complex logic and make components simple, testable, and reusable.

### Progressive Enhancement (All Phases)
Each phase adds capability without breaking previous functionality. Users can stop at any phase and have a working application.

### Security Defense in Depth (Phase 4)
- Password hashing (BCrypt)
- JWT tokens (stateless auth)
- Protected routes (frontend + backend)
- CORS configuration
- Authorization checks in service layer

---

## References to Existing Code

**Templates to follow:**
- `/Users/oz.oezden/IdeaProjects/test-next-js/` - Next.js project structure, TypeScript config, package.json
- `/Users/oz.oezden/IdeaProjects/private/to-do-app-with-login/` - Spring Boot structure, JWT implementation, database schema, Docker Compose setup

**Code to copy/adapt:**
- JWT Service: Copy from `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/security/jwt/JwtService.java`
- JWT Filter: Copy from `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/security/jwt/JwtAuthenticationFilter.java`
- Security Config: Adapt from `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/security/SecurityConfig.java`
- Docker Compose: Copy from `/private/to-do-app-with-login/docker-compose.yml` (MySQL setup on port 3307)

**Patterns to reference:**
- Flyway migrations: `/private/to-do-app-with-login/src/main/resources/db/migration/`
- Entity design: `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/domain/`
- Repository pattern: `/private/to-do-app-with-login/src/main/java/com/backend/todoappwithlogin/db/`

---

## Learning Objectives by Phase

**Phase 1:**
- Next.js App Router fundamentals
- TypeScript types and interfaces
- React hooks (useState, useEffect)
- Browser localStorage API
- Component composition patterns
- Service layer abstraction

**Phase 2:**
- Headless CMS concepts (Contentful)
- GraphQL query basics or SDK usage
- Environment variables in Next.js
- API integration patterns
- Server vs. Client components in Next.js 15
- Caching strategies

**Phase 3:**
- Spring Boot project structure
- Spring Data JPA & Hibernate ORM
- Database migrations with Flyway
- REST API design principles
- Docker for local development
- CORS configuration
- Multi-user data isolation
- Layered architecture (Domain → Repository → Service → Controller)

**Phase 4:**
- JWT authentication flow
- Spring Security configuration
- Password hashing with BCrypt
- Token-based authorization
- Protected routes in frontend
- Secure API communication
- `@AuthenticationPrincipal` pattern
- Stateless session management
