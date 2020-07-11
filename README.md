# Error Logger

## Prerequisite

- Node (macOS: `brew install node`)
- Postgres (macOS: `brew install postgres`)

## Database Setup

```
createdb errlog
echo DATABASE_URL=postgres://localhost/errlog > .env
```

## NPM Setup

```
npm install
npm run setup
npm start
```
