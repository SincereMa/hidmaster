---
name: generate-docs
description: Generate comprehensive documentation for codebases and projects
category: documentation
triggers:
  - document
  - docs
  - documentation
  - readme
  - write docs
  - generate docs
  - update docs
  - docstring
  - jsdoc
  - help text
prerequisites:
  - Access to source code
  - Understanding of project architecture
  - Knowledge of target audience
output:
  - README files
  - Code documentation
  - Usage guides
  - Contributing guidelines
---

# Generate Docs Skill

## Purpose

Create comprehensive, accurate documentation that helps users understand, use, and contribute to a project. Documentation should be clear, maintainable, and match code behavior.

## When to Use

- New project or feature needs documentation
- Existing docs are outdated or incomplete
- README needs updating
- API changes require doc updates
- Onboarding new team members
- Preparing for open source release

## Workflow

### Phase 1: Analyze

1. **Identify target audience**:
   - End users
   - Developers integrating the library
   - Contributors
   - Operations/DevOps
2. **Survey existing docs** - What exists? What's missing?
3. **Analyze codebase** - Entry points, public APIs, configuration
4. **Check for doc comments** - JSDoc, docstrings, comments

### Phase 2: Plan Structure

1. **README.md** - Project overview, quick start
2. **Installation** - How to install/setup
3. **Usage** - Common use cases with examples
4. **API Reference** - Detailed function/class docs
5. **Configuration** - All options explained
6. **Examples** - Working code samples
7. **Contributing** - How to contribute
8. **Changelog** - Version history

### Phase 3: Generate Content

#### README.md Template
```markdown
# Project Name

One-paragraph description of what this does.

## Features
- Feature 1
- Feature 2

## Quick Start

### Prerequisites
- Requirement 1
- Requirement 2

### Installation
\`\`\`bash
npm install project-name
\`\`\`

### Basic Usage
\`\`\`javascript
const project = require('project-name');
// Example code
\`\`\`

## Documentation
- [Installation Guide](./docs/installation.md)
- [API Reference](./docs/api.md)
- [Examples](./examples/)

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
[MIT](./LICENSE)
```

#### Code Documentation Standards
```javascript
/**
 * Brief description of what the function does.
 * 
 * @param {string} name - Description of parameter
 * @param {Object} options - Configuration options
 * @param {number} options.timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} True if successful
 * @throws {Error} When validation fails
 * 
 * @example
 * const result = await processData('test', { timeout: 5000 });
 */
```

### Phase 4: Review and Publish

1. **Technical accuracy** - Verify all code examples work
2. **Clarity check** - Read from user perspective
3. **Completeness** - All public APIs documented
4. **Consistency** - Same style throughout
5. **Build/test** - Ensure docs build correctly

## Output Format

```
## Documentation Generated

### Files Created/Updated
- [file path]: [brief description]

### Coverage
- [ ] README.md
- [ ] API Reference
- [ ] Usage Examples
- [ ] Configuration Guide
- [ ] Contributing Guide

### Notes
[Any decisions made, areas needing manual review]
```

## Examples

### Example 1: Function Documentation

**Code**:
```python
def connect_to_database(host, port=5432, ssl=True, timeout=30):
    pass
```

**Documentation**:
```python
def connect_to_database(host, port=5432, ssl=True, timeout=30):
    """
    Establish connection to the PostgreSQL database.
    
    Creates a new database connection with the specified parameters.
    The connection uses connection pooling for efficiency.
    
    Args:
        host (str): Database server hostname or IP address
        port (int): Database port number. Defaults to 5432.
        ssl (bool): Whether to use SSL/TLS. Defaults to True.
        timeout (int): Connection timeout in seconds. Defaults to 30.
    
    Returns:
        DatabaseConnection: Active database connection object
    
    Raises:
        ConnectionError: If unable to connect within timeout
        SSLError: If SSL handshake fails
        
    Example:
        >>> conn = connect_to_database('db.example.com')
        >>> conn.execute('SELECT * FROM users')
    """
```

### Example 2: CLI Help Text

**Generated**:
```
Usage: mycli [OPTIONS] COMMAND [ARGS]...

  My application CLI tool.

Options:
  --version  Show version and exit
  --verbose  Enable verbose output
  --config   Path to config file (default: ~/.mycli/config.json)
  --help     Show this message and exit

Commands:
  init       Initialize a new project
  build      Build the project
  deploy     Deploy to production
  test       Run tests
```

## Documentation Checklist

### README.md
- [ ] Project name and description
- [ ] Installation instructions
- [ ] Quick start example
- [ ] Link to full documentation
- [ ] License information

### API Reference
- [ ] All public functions/classes
- [ ] Parameter descriptions
- [ ] Return types
- [ ] Usage examples
- [ ] Error cases

### Configuration
- [ ] All config options
- [ ] Default values
- [ ] Environment variables
- [ ] Config file format

### Contributing
- [ ] Development setup
- [ ] Code style guide
- [ ] Testing instructions
- [ ] Pull request process

## Error Handling

| Situation | Action |
|-----------|--------|
| Code examples don't work | Test all examples before publishing |
| Unclear what something does | Ask maintainers, check tests for intended behavior |
| Outdated documentation | Verify against current code version |
| Missing context | Add background information, link to related docs |
| Multiple valid approaches | Document primary approach, mention alternatives |

## Documentation Quality Checklist

- [ ] Written for target audience
- [ ] Accurate and up-to-date
- [ ] Complete coverage of public API
- [ ] Code examples are copy-pasteable
- [ ] No jargon without explanation
- [ ] Consistent formatting
- [ ] Links work
- [ ] Builds without warnings

## Tools and Formats

### Static Site Generators
- Docusaurus (React)
- VuePress (Vue)
- Sphinx (Python)
- MkDocs (Python)
- mdBook (Rust)

### API Documentation
- OpenAPI/Swagger
- Postman Collections
- GraphQL Playground

### Documentation Standards
- Keep README under 500 lines
- One function per doc comment
- Examples should be runnable
- Version docs with code
