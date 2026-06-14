---
name: implement
description: Use when transforming design specifications into working, tested, production-ready code
category: core
trerequisites:
  - Completed architecture/design phase
  - Clear requirements and specifications
  - Development environment setup
  - Access to version control
output:
  type: working_code
  format: source_files
  includes:
    - implementation_code
    - unit_tests
    - documentation
---

# Implement Skill

## Overview

Transform design specifications into working, tested, production-ready code.

**Core principle:** Implement incrementally, test as you go, commit frequently.

## The Iron Law

```
NO IMPLEMENTATION WITHOUT CLEAR SPECIFICATION FIRST
```

If you don't understand what to build, don't start building. Ask for clarification.

## When to Use

- Implementing new features or components
- Refactoring existing code
- Fixing bugs with code changes
- Adding tests or improving test coverage

## Prerequisites

- Completed architecture/design phase with clear specifications
- Development environment properly configured
- Understanding of coding standards and conventions

## Workflow

### Phase 1: Preparation (5-10 minutes)

1. **Verify environment** — dependencies installed, tools working
2. **Break down tasks** — identify dependencies, prioritize by risk
3. **Plan sequence** — models/types → business logic → integration → API/UI

### Phase 2: Implementation (60-90% of time)

**Implementation order:**
```
1. Data models/types (define interfaces first)
   ↓
2. Core business logic
   ↓
3. Integration points
   ↓
4. UI/API layer
   ↓
5. Configuration and setup
```

**Coding standards:**
- Follow established naming conventions
- Write self-documenting code
- Keep functions focused and small (<30 lines)
- Add comments only for complex logic
- Handle errors appropriately

**Incremental development:**
- Implement in small, testable increments
- Commit frequently with clear messages
- Test each increment before proceeding
- Refactor as understanding improves

### Phase 3: Quality Assurance (15-20 minutes)

1. **Self-check** — review for correctness, edge cases, naming
2. **Write tests** — unit tests for core logic, integration tests for components
3. **Update docs** — API documentation, usage examples

### Phase 4: Integration and Validation (10-15 minutes)

1. **Integration testing** — test with existing components, verify workflows
2. **Performance check** — profile critical paths if needed
3. **Security review** — check common vulnerabilities

## Implementation Patterns

### Code Organization
```
src/
├── models/            # Data models and types
├── services/          # Business logic
├── components/        # UI components (if applicable)
├── utils/             # Utility functions
└── index.ts           # Entry point
```

### Type-First Implementation
```typescript
// 1. Define interfaces first
export interface User {
  id: string;
  name: string;
  email: string;
}

// 2. Implement business logic
export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    this.validateInput(data);
    return this.repo.create({ ...data, id: generateId() });
  }
}
```

## Common Pitfalls

| Pitfall | Symptom | Solution |
|---------|---------|----------|
| Premature optimization | Complex code for imaginary issues | Implement simply first, optimize based on profiling |
| Incomplete error handling | Silent failures or unclear messages | Implement comprehensive error handling |
| Over-abstraction | Complex abstractions for simple problems | Start concrete, abstract when patterns emerge |
| Insufficient testing | Bugs found in production | Write tests alongside implementation |

## Best Practices

1. **Start with types** — Define interfaces before implementation
2. **Implement incrementally** — Build in small, testable pieces
3. **Test as you go** — Write tests alongside implementation
4. **Commit frequently** — Save progress often with clear messages
5. **Keep it simple** — Prefer clarity over cleverness

## Integration

**Related skills:**
- **architect** — Implements architectural decisions
- **tdd** — Write tests first, then implement
- **validate** — Provides code for testing
- **ship** — Prepares code for deployment

**Workflow chain:**
```
architect → implement → validate → ship
```

**Next skill:** After implementation is complete, use **validate** to test the code thoroughly before claiming completion.
