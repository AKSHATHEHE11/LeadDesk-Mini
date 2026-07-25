# TASK B – Inherit and Improve

## Project Assessment

### Overview

The inherited application is functional but suffers from several architectural, security, and maintainability issues that make it risky to scale or modify. Although customers actively use the system, technical debt has accumulated due to poor engineering practices.

The goal is to improve the application incrementally without disrupting existing users.

---

# A. Assessment

## 1. Secrets Committed to the Repository (Critical)

### Issue

Database credentials, JWT secrets, and API keys are stored inside the repository.

### Risk

- Database compromise
- Account takeover
- Credential leakage
- Regulatory and compliance issues

### Priority

**Immediate (Day 1)**

### Fix

- Remove secrets from Git history.
- Move configuration into environment variables.
- Rotate compromised credentials.

---

## 2. Business Logic Inside Route Handlers (High)

### Issue

Route handlers directly contain validation, business logic, and database operations.

### Example

```javascript
router.post("/lead", async (req, res) => {
    const lead = await Lead.create(req.body);

    if (lead.status === "New") {
        // business logic
    }

    res.json(lead);
});
```

### Risk

- Difficult to maintain
- Code duplication
- Hard to test
- Large route files

### Fix

Refactor the application into a layered architecture.

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
```

---

## 3. Direct Database Access from Frontend (Critical)

### Issue

Frontend directly queries the database.

### Risk

- Complete security failure
- No authorization
- Database exposed publicly

### Fix

Move all data access behind secured REST APIs.

---

## 4. No Automated Tests (High)

### Issue

Changes are deployed without verification.

### Risk

- Frequent regressions
- Production outages
- Slow development

### Fix

Introduce **Jest** and **Supertest** for automated API testing.

---

## 5. Missing Role Enforcement (High)

### Issue

Some permissions are enforced only in the frontend.

### Risk

Users can bypass UI restrictions using API clients such as Postman.

### Fix

Enforce authorization on the backend for every protected endpoint.

---

## 6. No Logging or Monitoring (Medium)

### Issue

Production failures cannot be diagnosed efficiently.

### Fix

Introduce:

- Winston
- Morgan
- Centralized error middleware
- Health check endpoint

---

## 7. No API Documentation (Medium)

### Issue

Developers must inspect source code to understand API behaviour.

### Fix

Document APIs using Swagger or OpenAPI.

---

# Prioritization

| Priority | Issue | Risk |
|----------|-------|------|
| Critical | Secrets in repository | Security breach |
| Critical | Direct database access | Data exposure |
| High | Missing authorization | Privilege escalation |
| High | No automated tests | Regression risk |
| High | Business logic inside routes | Poor maintainability |
| Medium | Logging and monitoring | Difficult debugging |
| Medium | API documentation | Reduced developer productivity |

---

# B. Migration Plan

## Week 1

### Objective

Stabilize production without affecting customers.

### Deliverables

- Remove secrets from the repository
- Rotate exposed credentials
- Configure environment variables
- Add centralized error handling
- Implement backend authorization
- Add logging
- Configure CI pipeline

**No user-facing functionality changes.**

---

## Month 1

### Objective

Improve maintainability.

### Deliverables

- Move business logic into services
- Separate controllers from routes
- Introduce request validation
- Write authentication tests
- Write lead management tests
- Introduce API documentation

Changes will be deployed incrementally to avoid production risk.

---

## Quarter 1

### Objective

Modernize the architecture.

### Deliverables

- Improve overall project structure
- Increase automated test coverage
- Performance optimization
- Introduce caching
- Monitoring dashboards
- Rate limiting
- Security audit
- Automated deployment pipeline

---

# C. Refactor Example

## Before

```javascript
router.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(404).send();

    const valid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!valid)
        return res.status(401).send();

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.json(token);
});
```

### Problems

- Business logic inside routes
- Difficult to test
- No reusable service layer
- Poor readability
- Violates separation of concerns

---

## After

### Route

```javascript
router.post("/login", authController.login);
```

### Controller

```javascript
exports.login = async (req, res) => {

    const result = await authService.login(req.body);

    res.status(200).json(result);

};
```

### Service

```javascript
exports.login = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user)
        throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid)
        throw new Error("Invalid credentials");

    return {
        token: generateToken(user)
    };

};
```

### Improvements

- Clear separation of concerns
- Reusable business logic
- Easier unit testing
- Cleaner route handlers
- Better maintainability
- Reduced code duplication

---

# D. Engineering Standards

## Code Standards

- Follow a consistent project structure.
- Keep controllers thin.
- Place business logic inside service layers.
- Database access only through models/services.
- Use async/await consistently.
- Validate every incoming request.
- Never expose secrets in repositories.

---

## Testing Standards

- Unit tests for service functions.
- Integration tests for REST APIs.
- Run automated tests before every deployment.
- Require successful CI checks before merging pull requests.

---

## Git Standards

- Feature branches
- Pull requests
- Mandatory code reviews
- Descriptive commit messages

---

## Security Standards

- JWT authentication
- Password hashing using bcrypt
- Environment variables for secrets
- Role-based authorization
- Request validation
- Rate limiting

---

# Team Adoption Strategy

Rather than introducing every engineering rule simultaneously, improvements would be rolled out incrementally to minimise disruption and encourage adoption.

The rollout plan would include:

- Begin with coding guidelines and mandatory pull request reviews.
- Introduce automated linting and testing so standards are enforced automatically.
- Pair with team members during the initial refactors to demonstrate best practices.
- Measure progress using metrics such as test coverage, deployment success rate, and defect rate.
- Collect regular team feedback and refine standards based on practical experience.

---

# Live Build

**Application**

https://lead-desk-mini-gilt-alpha.vercel.app/

**Footer Credit**

Built for **Digital Heroes Training Task**

https://digitalheroesco.com