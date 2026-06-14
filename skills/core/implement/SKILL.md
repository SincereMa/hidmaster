---
name: implement
description: Code implementation and development workflow
category: core
triggers:
  - "implement feature"
  - "write code"
  - "develop functionality"
  - "build component"
  - "create module"
prerequisites:
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
    - configuration
---

# Implement Skill

## Overview

Transform design specifications into working, tested, production-ready code. This skill provides a systematic approach to implementation that ensures quality, maintainability, and adherence to design decisions.

## When to Use

- Implementing new features or components
- Refactoring existing code
- Fixing bugs with code changes
- Adding tests or improving test coverage
- Updating documentation through code
- Performance optimization
- Security hardening

## Prerequisites

- Completed architecture/design phase with clear specifications
- Development environment properly configured
- Understanding of coding standards and conventions
- Access to version control system
- Knowledge of testing frameworks and tools

## Detailed Workflow

### Phase 1: Preparation (5-10 minutes)

**Step 1.1: Environment Setup**
- Verify development environment is working
- Ensure all dependencies are installed
- Check for necessary access and permissions
- Review coding standards and style guides

**Step 1.2: Task Breakdown**
- Break specification into implementable units
- Identify dependencies between tasks
- Estimate effort for each unit
- Prioritize based on dependencies and risk

**Step 1.3: Implementation Plan**
- Create implementation sequence
- Identify integration points
- Plan testing approach for each unit
- Document any assumptions or deviations

### Phase 2: Implementation (60-90% of time)

**Step 2.1: Core Implementation**
```
1. Start with data models/types
   ↓
2. Implement core business logic
   ↓
3. Add integration points
   ↓
4. Implement UI/API layer
   ↓
5. Add configuration and setup
```

**Step 2.2: Coding Standards**
- Follow established naming conventions
- Write self-documenting code
- Keep functions focused and small
- Add comments only for complex logic
- Use meaningful variable names
- Handle errors appropriately

**Step 2.3: Incremental Development**
- Implement in small, testable increments
- Commit frequently with clear messages
- Test each increment before proceeding
- Refactor as understanding improves

**Step 2.4: Integration Points**
- Define clear interfaces between components
- Use dependency injection where appropriate
- Implement proper error propagation
- Ensure consistent data flow

### Phase 3: Quality Assurance (15-20 minutes)

**Step 3.1: Code Review Self-Check**
- Review code for correctness
- Check for edge cases and error conditions
- Verify naming and documentation
- Ensure consistency with existing code

**Step 3.2: Testing Implementation**
- Write unit tests for core logic
- Add integration tests for components
- Test error conditions and edge cases
- Verify performance requirements

**Step 3.3: Documentation Update**
- Update API documentation
- Add inline comments for complex logic
- Update README or usage examples
- Document any deviations from design

### Phase 4: Integration and Validation (10-15 minutes)

**Step 4.1: Integration Testing**
- Test with existing components
- Verify end-to-end workflows
- Check for regression issues
- Validate against requirements

**Step 4.2: Performance Validation**
- Profile critical paths
- Check memory usage
- Verify response times
- Test under load if applicable

**Step 4.3: Security Review**
- Check for common vulnerabilities
- Validate input/output handling
- Review authentication/authorization
- Test for injection attacks

## Implementation Patterns

### Code Organization
```
src/
├── components/          # UI components
│   ├── ComponentA/
│   │   ├── index.tsx
│   │   ├── styles.module.css
│   │   ├── ComponentA.test.tsx
│   │   └── types.ts
├── services/           # Business logic
│   ├── UserService.ts
│   ├── UserService.test.ts
├── models/            # Data models
│   ├── User.ts
│   └── User.types.ts
├── utils/             # Utility functions
│   ├── helpers.ts
│   └── constants.ts
└── index.ts           # Entry point
```

### Implementation Template
```typescript
// types.ts - Define interfaces first
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// UserService.ts - Core business logic
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    // Validate input
    this.validateCreateInput(data);
    
    // Check business rules
    await this.checkEmailUnique(data.email);
    
    // Create user
    const user = await this.userRepository.create({
      ...data,
      id: generateId(),
      createdAt: new Date(),
    });
    
    // Send welcome email
    await this.sendWelcomeEmail(user);
    
    return user;
  }

  private validateCreateInput(data: CreateUserDTO): void {
    if (!data.name || data.name.length < 2) {
      throw new ValidationError('Name must be at least 2 characters');
    }
    if (!this.isValidEmail(data.email)) {
      throw new ValidationError('Invalid email format');
    }
  }
}
```

### Test-Driven Implementation
```typescript
// UserService.test.ts
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const mockRepo = createMockUserRepository();
      const service = new UserService(mockRepo);
      const userData = { name: 'John', email: 'john@example.com' };
      
      // Act
      const result = await service.createUser(userData);
      
      // Assert
      expect(result).toMatchObject({
        name: 'John',
        email: 'john@example.com',
      });
      expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        name: 'John',
        email: 'john@example.com',
      }));
    });

    it('should throw error for invalid email', async () => {
      // Arrange
      const service = new UserService(createMockUserRepository());
      const userData = { name: 'John', email: 'invalid-email' };
      
      // Act & Assert
      await expect(service.createUser(userData))
        .rejects.toThrow('Invalid email format');
    });
  });
});
```

## Coding Standards Checklist

### Before Writing Code
- [ ] Understand the specification completely
- [ ] Review existing code for patterns
- [ ] Plan the implementation approach
- [ ] Identify potential edge cases

### During Implementation
- [ ] Follow naming conventions
- [ ] Write self-documenting code
- [ ] Handle errors appropriately
- [ ] Keep functions focused
- [ ] Add only necessary comments
- [ ] Commit frequently

### After Implementation
- [ ] Review code for correctness
- [ ] Write/update tests
- [ ] Update documentation
- [ ] Verify integration
- [ ] Check performance
- [ ] Review security implications

## Output Format

### Implementation Deliverables
```
1. Source Code Files
   - Implementation files following project structure
   - Type definitions and interfaces
   - Configuration files

2. Test Files
   - Unit tests for core logic
   - Integration tests for components
   - Test fixtures and mocks

3. Documentation
   - API documentation
   - Usage examples
   - Configuration guide

4. Configuration
   - Environment variables
   - Build configuration
   - Deployment scripts
```

### Code Review Checklist
```markdown
## Code Review Checklist

### Correctness
- [ ] Code implements specification correctly
- [ ] Edge cases are handled
- [ ] Error conditions are managed
- [ ] Performance requirements met

### Quality
- [ ] Code is readable and maintainable
- [ ] Naming is clear and consistent
- [ ] Functions are appropriately sized
- [ ] No code duplication

### Testing
- [ ] Unit tests cover core logic
- [ ] Integration tests verify components
- [ ] Edge cases are tested
- [ ] Tests are maintainable

### Documentation
- [ ] Code is self-documenting
- [ ] Complex logic is commented
- [ ] API documentation updated
- [ ] Usage examples provided
```

## Examples

### Example 1: REST API Endpoint Implementation
**Specification**: Create user registration endpoint

**Implementation Steps**:
1. Define User model and DTOs
2. Create validation middleware
3. Implement registration service
4. Add route handler
5. Write unit tests
6. Add integration tests
7. Update API documentation

**Deliverables**:
- POST /api/users endpoint
- User validation schema
- Registration service with email verification
- Comprehensive test suite
- OpenAPI documentation

### Example 2: React Component Implementation
**Specification**: Create reusable button component

**Implementation Steps**:
1. Define component props interface
2. Implement base component with variants
3. Add styling with CSS modules
4. Create storybook stories
5. Write unit tests
6. Add accessibility features
7. Document usage examples

**Deliverables**:
- Button component with variants (primary, secondary, etc.)
- CSS module styles
- Storybook stories for all variants
- Unit tests for interactions
- Accessibility compliance

## Error Handling

### Common Implementation Pitfalls

1. **Premature Optimization**
   - **Symptom**: Complex code for imaginary performance issues
   - **Solution**: Implement simply first, optimize based on profiling

2. **Incomplete Error Handling**
   - **Symptom**: Silent failures or unclear error messages
   - **Solution**: Implement comprehensive error handling with clear messages

3. **Over-Abstraction**
   - **Symptom**: Complex abstractions for simple problems
   - **Solution**: Start concrete, abstract when patterns emerge

4. **Insufficient Testing**
   - **Symptom**: Bugs found in production
   - **Solution**: Write tests alongside implementation

### Recovery Strategies

- **Stuck on Implementation**: Break into smaller pieces, seek help
- **Unclear Requirements**: Clarify with stakeholders before proceeding
- **Technical Debt**: Document and plan for later cleanup
- **Integration Issues**: Test integration points early and often

## Best Practices

1. **Start with Types**: Define interfaces before implementation
2. **Implement Incrementally**: Build in small, testable pieces
3. **Test as You Go**: Write tests alongside implementation
4. **Commit Frequently**: Save progress often with clear messages
5. **Refactor Continuously**: Improve code as understanding grows
6. **Document Decision**: Record why, not just what
7. **Consider Edge Cases**: Think about failure modes
8. **Keep it Simple**: Prefer clarity over cleverness

## Integration Points

This skill integrates with:
- **architect**: Implements architectural decisions
- **validate**: Provides code for testing
- **ship**: Prepares code for deployment
- **iterate**: Feeds back improvements

## Metrics for Success

- **Code Quality**: Meets coding standards and best practices
- **Test Coverage**: Adequate test coverage for critical paths
- **Performance**: Meets performance requirements
- **Maintainability**: Code is easy to understand and modify
- **Documentation**: Clear and complete documentation
