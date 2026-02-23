This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a .ENV file in the root of the project.
Then, define the following variables:
```
DATABASE_URL
NEXTAUTH_SECRET
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
NEXTAUTH_URL=http://localhost:3000
```
To define the GitHub variables, Prisma documentation can guide you through the link: https://www.prisma.io/docs/guides/authentication/authjs/nextjs
To define the database URL, the Prisma documentation can also guide you by using the direct URL found int the following page: https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
