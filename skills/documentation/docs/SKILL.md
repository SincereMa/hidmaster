---
name: docs
description: Use when generating, updating, or maintaining project documentation including README, API reference, and code comments
category: documentation
prerequisites:
  - Access to source code
  - Understanding of project architecture
  - Knowledge of target audience
output:
  - Documentation files (README, API reference, guides)
  - OpenAPI/Swagger specifications
  - Code documentation (JSDoc, docstrings)
---

# Docs Skill

## Overview

Create comprehensive, accurate documentation that helps users understand, use, and contribute to a project. Covers project docs, API reference, and code documentation.

**Core principle:** Documentation should be clear, maintainable, and match code behavior.

## When to Use

- New project or feature needs documentation
- Existing docs are outdated or incomplete
- README needs updating
- API endpoints need documentation
- Preparing for open source release
- Onboarding new team members

## Workflow

### Phase 1: Analyze (10-15 minutes)

1. **Identify audience** — end users, developers, contributors, operations
2. **Survey existing docs** — what exists, what's missing
3. **Analyze codebase** — entry points, public APIs, configuration
4. **Check doc comments** — JSDoc, docstrings, existing comments

### Phase 2: Plan Structure (10-15 minutes)

**Documentation hierarchy:**
```
README.md              # Project overview, quick start
├── docs/
│   ├── installation.md  # Setup instructions
│   ├── usage.md         # Common use cases
│   ├── api-reference.md # Detailed API docs
│   ├── configuration.md # All options explained
│   └── contributing.md  # How to contribute
└── CHANGELOG.md         # Version history
```

### Phase 3: Generate Content (30-60 minutes)

**README.md essentials:**
- Project name and one-paragraph description
- Features list
- Quick start (prerequisites, installation, basic usage)
- Link to full documentation
- License

**API documentation (for REST/GraphQL):**
- Endpoint summary table (method, path, description, auth)
- For each endpoint: purpose, parameters, response codes, examples
- Authentication guide (how to get/use tokens)
- Error response format and common error codes
- Rate limiting documentation

**Code documentation:**
- JSDoc/docstrings for all public functions/classes
- Parameter descriptions, return types, exceptions
- Usage examples in doc comments

### Phase 4: Review and Publish (10-15 minutes)

1. **Technical accuracy** — verify all code examples work
2. **Clarity check** — read from user perspective
3. **Completeness** — all public APIs documented
4. **Consistency** — same style throughout

## API Documentation

### Endpoint Documentation Template

```markdown
## POST /api/v1/users

Create a new user account.

**Authentication**: Bearer token required

### Request
```http
POST /api/v1/users HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Response (201 Created)
```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Error Response (400 Bad Request)
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  }
}
```
```

### OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: API Title
  version: 1.0.0
paths:
  /users:
    post:
      summary: Create user
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: User created
```

## Code Documentation

### JSDoc Example
```javascript
/**
 * Process user data with validation.
 * 
 * @param {Object} data - User input data
 * @param {string} data.email - User email address
 * @param {string} data.name - User display name
 * @returns {Promise<User>} Created user object
 * @throws {ValidationError} If input is invalid
 * 
 * @example
 * const user = await createUser({ email: 'a@b.com', name: 'Test' });
 */
```

### Python Docstring Example
```python
def connect_database(host: str, port: int = 5432) -> Connection:
    """
    Establish database connection.
    
    Args:
        host: Database server hostname
        port: Database port number. Defaults to 5432.
    
    Returns:
        Active database connection
    
    Raises:
        ConnectionError: If unable to connect
    """
```

## Documentation Checklist

### README
- [ ] Project name and description
- [ ] Installation instructions
- [ ] Quick start example
- [ ] Link to full documentation
- [ ] License

### API Reference
- [ ] All endpoints documented
- [ ] Request/response schemas defined
- [ ] Authentication documented
- [ ] Error responses included
- [ ] Code examples provided

### Code Documentation
- [ ] Public functions have doc comments
- [ ] Parameters described
- [ ] Return types documented
- [ ] Exceptions documented
- [ ] Examples provided

## Common Issues

| Issue | Solution |
|-------|----------|
| Code examples don't work | Test all examples before publishing |
| Unclear documentation | Ask maintainers, check tests |
| Outdated docs | Verify against current code |
| Missing context | Add background, link to related docs |

## Best Practices

1. **Write for your audience** — developers need different info than end users
2. **Keep it accurate** — docs that don't match code erode trust
3. **Examples are king** — working examples beat abstract descriptions
4. **Version with code** — docs should be updated with every release
5. **Keep README short** — link to detailed docs, don't duplicate

## Integration

**Related skills:**
- **changelog** — Generate changelog for releases
- **code-review** — Review documentation as part of code review
- **ship** — Update docs as part of release process

**Workflow:**
```
implement → docs → ship
```
