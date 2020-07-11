# Error Logger

## Prerequisite

- Node (`brew install node`)
- Postgres (`brew install postgresql`)

## Setup

```
echo DATABASE_URL=postgres://localhost/errlog > .env
npm install
npm start
```

## Database setup

```
createdb errlog
```

**Then go to url: `/api/sync`**

> Setup is complete
