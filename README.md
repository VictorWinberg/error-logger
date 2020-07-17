# Glitchy

[![Build](https://github.com/VictorWinberg/glitchy/workflows/Build/badge.svg)](https://github.com/VictorWinberg/glitchy/actions?query=workflow%3ABuild+branch%3Amaster)
[![codecov](https://codecov.io/gh/VictorWinberg/glitchy/branch/master/graph/badge.svg)](https://codecov.io/gh/VictorWinberg/glitchy)

## Prerequisite

- Node (macOS: `brew install node`)
- Postgres (macOS: `brew install postgres`)

## Database Setup

```
createdb glitchy
echo DATABASE_URL=postgres://localhost/glitchy > .env
```

## Node Setup

```
npm install
npm run setup
npm start
```
