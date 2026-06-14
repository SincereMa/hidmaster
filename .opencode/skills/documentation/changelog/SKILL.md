---
name: changelog
description: Generate and maintain changelogs following semantic versioning conventions
category: documentation
triggers:
  - changelog
  - release notes
  - version history
  - what's new
  - release
  - version bump
  - breaking changes
  - update changelog
prerequisites:
  - Access to git history
  - Understanding of semantic versioning
  - Knowledge of breaking changes
output:
  - CHANGELOG.md file
  - Release notes
  - Version tags
  - Migration guides
---

# Changelog Skill

## Purpose

Create clear, user-focused changelogs that communicate what changed, why it matters, and how to update. Follow Keep a Changelog and Semantic Versioning conventions.

## When to Use

- Preparing a new release
- Documenting breaking changes
- Summarizing feature additions
- Creating release notes for stakeholders
- Automating release documentation

## Workflow

### Phase 1: Analyze Changes

1. **Gather commits since last release**:
   ```bash
   git log --oneline v1.0.0..HEAD
   ```
2. **Categorize changes**:
   - **Added** - New features
   - **Changed** - Changes to existing functionality
   - **Deprecated** - Features that will be removed
   - **Removed** - Features removed
   - **Fixed** - Bug fixes
   - **Security** - Vulnerability fixes
3. **Identify breaking changes** - Anything that requires user action
4. **Link to issues/PRs** - Reference relevant discussions

### Phase 2: Determine Version

Follow Semantic Versioning:
- **MAJOR** (X.0.0) - Breaking changes
- **MINOR** (x.Y.0) - New features, backward compatible
- **PATCH** (x.y.Z) - Bug fixes, backward compatible

### Phase 3: Write Changelog

#### Keep a Changelog Format
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2024-01-15

### Added
- User profile customization
- Dark mode support
- Batch export feature

### Changed
- Improved search performance by 50%
- Updated UI component library

### Fixed
- Fixed memory leak in WebSocket handler
- Fixed date formatting in Safari

### Security
- Updated dependencies for CVE-2024-1234

## [1.1.0] - 2024-01-01
...
```

### Phase 4: Create Release Assets

1. **Version tag**:
   ```bash
   git tag -a v1.2.0 -m "Release 1.2.0"
   ```
2. **Release notes** - Platform-specific (GitHub/GitLab)
3. **Migration guide** - For breaking changes
4. **Announcement** - Blog post, email, social

## Output Format

```
## Changelog Generated

### Version: 1.2.0

### Changes Summary
- Added: 3 new features
- Fixed: 2 bug fixes
- Changed: 1 improvement

### Breaking Changes
- None (or list with migration path)

### Files Updated
- CHANGELOG.md

### Release Assets
- Git tag: v1.2.0
- GitHub release: created
```

## Examples

### Example 1: Feature Release

**Git Log**:
```
abc1234 feat(auth): add OAuth2 support
def5678 feat(api): add batch endpoint
ghi9012 fix(dashboard): fix chart rendering
jkl3456 docs: update API examples
```

**Changelog Entry**:
```markdown
## [2.0.0] - 2024-01-15

### Added
- OAuth2 authentication support ([#123](https://github.com/org/repo/issues/123))
- Batch API endpoint for bulk operations ([#124](https://github.com/org/repo/issues/124))

### Fixed
- Fixed chart rendering issue in dashboard ([#125](https://github.com/org/repo/issues/125))

### Changed
- **BREAKING**: Authentication flow now requires OAuth2
  - Migration: See [OAuth2 Migration Guide](./docs/migration/oauth2.md)
```

### Example 2: Bug Fix Release

```markdown
## [1.0.1] - 2024-01-10

### Fixed
- Fixed incorrect tax calculation for EU customers
- Fixed timeout on large file uploads (>100MB)
- Fixed memory leak in background worker

### Security
- Updated lodash to 4.17.21 (CVE-2021-23337)
```

### Example 3: Deprecation Notice

```markdown
## [3.0.0] - 2024-01-20

### Deprecated
- `/api/v1/*` endpoints - Will be removed in v4.0.0
  - Use `/api/v2/*` instead
  - Migration guide: [v1 to v2 Migration](./docs/migration/v1-to-v2.md)

### Removed
- Legacy XML export (use JSON instead)
- Internet Explorer 11 support
```

## Semantic Versioning Decision Tree

```
Is there a breaking change?
├── Yes → MAJOR version (1.0.0 → 2.0.0)
└── No
    └── Is there a new feature?
        ├── Yes → MINOR version (1.0.0 → 1.1.0)
        └── No
            └── Is there a bug fix?
                ├── Yes → PATCH version (1.0.0 → 1.0.1)
                └── No → Don't release
```

## Commit Message Convention

Format: `<type>(<scope>): <description>`

### Types
- **feat**: New feature (MINOR)
- **fix**: Bug fix (PATCH)
- **docs**: Documentation only
- **style**: Code style (no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Adding tests
- **chore**: Build process, dependencies
- **BREAKING CHANGE**: In commit footer (MAJOR)

### Examples
```
feat(auth): add OAuth2 support
fix(api): resolve timeout on large requests
docs: update installation guide
perf: optimize database queries
BREAKING CHANGE: remove deprecated v1 endpoints
```

## Breaking Changes Documentation

When documenting breaking changes:

```markdown
### Breaking Changes

#### Removed: Legacy Authentication
The `/auth/legacy` endpoint has been removed.

**Migration Path:**
1. Update client to use `/auth/oauth2`
2. See [Auth Migration Guide](./docs/auth-migration.md)

**Timeline:**
- Deprecated in v2.0.0
- Removed in v3.0.0
```

## Validation Checklist

- [ ] All significant changes documented
- [ ] Version follows semantic versioning
- [ ] Breaking changes clearly marked
- [ ] Migration paths provided
- [ ] Issue/PR links included
- [ ] Dates are correct
- [ ] Format is consistent
- [ ] Release assets created

## Automation

### GitHub Actions Example
```yaml
name: Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create Release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body_path: CHANGELOG.md
```

### Conventional Commits Tools
- standard-version
- semantic-release
- commit-and-tag-version
- conventional-changelog

## Changelog Quality Checklist

- [ ] User-focused (what matters to them)
- [ ] Links to issues/PRs for context
- [ ] Clear breaking change warnings
- [ ] Actionable migration guides
- [ ] Consistent formatting
- [ ] Dates are accurate
- [ ] No internal jargon
- [ ] Grouped logically (Added, Fixed, etc.)

## Common Mistakes to Avoid

- Listing every commit (group related changes)
- Using developer jargon (user-focused language)
- Forgetting to document breaking changes
- Not providing migration paths
- Inconsistent date formats
- Missing version links
