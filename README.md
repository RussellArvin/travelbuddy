# How to run travel buddy
This guide will run you through a guide on how to run travelbuddy
## Prerequisites
Before you start, ensure you have the following installed:

- Node.js 
- PNPM 
- Google Cloud Account
- OpenAI Account
- Docker
- Clerk Account

## Step 1

run the command to install all node modules

```bash
pnpm install
```

## Step 2

deploy the docker container with postgres

```bash
docker compose up -d --build  
```

## Step 3
ensure your env variables are updated to the format given in the env example of below

```env
# Database
DATABASE_URL="postgres://username:12345@localhost:5432/2024techfest"
POSTGRES_USER="username"
POSTGRES_PASSWORD="12345"
POSTGRES_DB="2024techfest"

# CLERK Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=CLERKKEY


#OPENAI
INITIAL_PROMPT1="PROMPT"
INITIAL_PROMPT2="PROMPT"

OPENAI_API_KEY='YOUR API KEY'

#GOOGLE
GOOGLE_PLACES_API_KEY='YOUR API KEY'
```

## Step 4

run the command to pull latest database migrations
```bash
pnpm drizzle-kit push:pg
```

## Step 5 

Run the project using this command!
```bash
pnpm run dev
```