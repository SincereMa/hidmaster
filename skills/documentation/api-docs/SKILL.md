---
name: api-docs
description: Generate comprehensive API documentation with specifications and examples
category: documentation
triggers:
  - api docs
  - api documentation
  - swagger
  - openapi
  - rest api
  - graphql schema
  - endpoint
  - route documentation
  - api reference
prerequisites:
  - Access to API source code or routes
  - Understanding of request/response formats
  - Knowledge of authentication requirements
output:
  - OpenAPI/Swagger specifications
  - API reference documentation
  - Interactive documentation
  - Client SDK documentation
---

# API Docs Skill

## Purpose

Create complete, accurate API documentation that enables developers to integrate with your API efficiently. Include specifications, examples, and interactive elements.

## When to Use

- New API endpoints are created
- API behavior changes
- New API version release
- Client SDK development
- Developer onboarding
- Postman/Insomnia collections needed

## Workflow

### Phase 1: Discover API

1. **Identify all endpoints**:
   - Route definitions
   - HTTP methods
   - URL patterns
   - Middleware/auth requirements
2. **Analyze request formats**:
   - Headers
   - Query parameters
   - Path parameters
   - Request bodies
   - File uploads
3. **Analyze response formats**:
   - Status codes
   - Response bodies
   - Headers
   - Error formats
4. **Document authentication**:
   - Auth methods (API key, OAuth, JWT)
   - Required headers
   - Token refresh flow

### Phase 2: Define Specification

#### OpenAPI 3.0 Structure
```yaml
openapi: 3.0.0
info:
  title: API Title
  version: 1.0.0
  description: API description
servers:
  - url: https://api.example.com/v1
    description: Production
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```

### Phase 3: Document Endpoints

#### For each endpoint, document:

1. **Endpoint Overview**
   - Purpose
   - Authentication required
   - Rate limiting

2. **Parameters**
   - Path parameters
   - Query parameters
   - Headers
   - Request body schema

3. **Response Codes**
   - Success responses
   - Error responses
   - Edge cases

4. **Examples**
   - Request example
   - Response example
   - cURL command

5. **Code Samples**
   - JavaScript/Node.js
   - Python
   - cURL
   - Go

### Phase 4: Generate Documentation

1. **Create OpenAPI spec** - Machine-readable API definition
2. **Generate reference docs** - Human-readable documentation
3. **Set up interactive docs** - Try-it-out functionality
4. **Create SDK examples** - Language-specific code samples
5. **Validate spec** - Ensure specification is valid

## Output Format

```
## API Documentation Generated

### Endpoints Documented
- GET /users - List all users
- POST /users - Create new user
- GET /users/:id - Get user by ID
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

### Files Created
- openapi.yaml - API specification
- docs/api-reference.md - Human-readable docs
- examples/javascript.js - JS code samples
- examples/python.py - Python code samples

### Interactive Docs
Available at: http://localhost:3000/docs
```

## Examples

### Example 1: REST Endpoint Documentation

**Endpoint**: `POST /api/v1/users`

**Description**: Create a new user account

**Authentication**: Bearer token required

**Request**:
```http
POST /api/v1/users HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securePassword123"
}
```

**Response (201 Created)**:
```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "email": "Invalid email format"
    }
  }
}
```

**cURL Example**:
```bash
curl -X POST https://api.example.com/api/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe"}'
```

### Example 2: OpenAPI Specification

```yaml
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      operationId: getUserById
      tags:
        - Users
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: User ID
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
```

## API Documentation Template

### Endpoint Summary Table

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /users | List users | Yes |
| POST | /users | Create user | Yes |
| GET | /users/:id | Get user | Yes |
| PUT | /users/:id | Update user | Yes |
| DELETE | /users/:id | Delete user | Yes |

### Authentication Guide

```markdown
## Authentication

All API requests require authentication via Bearer token.

### Getting a Token
1. POST to /auth/login with credentials
2. Receive access token in response
3. Include in subsequent requests: Authorization: Bearer <token>

### Token Expiration
- Access tokens expire after 1 hour
- Use refresh token to get new access token
- Refresh tokens expire after 30 days
```

### Rate Limiting

```markdown
## Rate Limits

| Plan | Requests/minute | Requests/day |
|------|-----------------|--------------|
| Free | 60 | 1000 |
| Pro | 600 | 10000 |
| Enterprise | 6000 | Unlimited |

Rate limit headers included in response:
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset
```

## Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "field": "Additional context"
    },
    "requestId": "req_abc123"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTHENTICATION_REQUIRED | 401 | Missing or invalid auth token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource doesn't exist |
| VALIDATION_ERROR | 400 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

## Validation Checklist

- [ ] All endpoints documented
- [ ] Request/response schemas defined
- [ ] Authentication documented
- [ ] Error responses included
- [ ] Code examples provided
- [ ] OpenAPI spec validates
- [ ] Examples are tested
- [ ] Rate limits documented

## Tools

### Generators
- swagger-ui-express (Node.js)
- Fastify swagger
- DRF Spectacular (Python)
- Swashbuckle (.NET)

### Validators
- swagger-cli validate
- openapi-generator
- spectral (linting)

### Publishers
- Swagger UI
- Redoc
- Stoplight
- Postman
