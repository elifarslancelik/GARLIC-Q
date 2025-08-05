# GARLIC-Q 🧄

layers of garlic

![GARLIC-Q Logo](frontend/assets/garliq.png)

## Project Structure - Monorepo

### Service Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │     Models      │
│   (Port xx)     │◄──►│   (Port xxxx)   │◄──►│   (Port xxxx)   │
│   nginx + React │    │   FastAPI       │    │   AI/ML         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Port xxxx)   │
                    │   + pgvector    │
                    └─────────────────┘
```
