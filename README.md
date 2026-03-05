# Fastbreak AI Sports Event Dashboard

## Overview

This is a Next.js application for the Fastbreak AI Sports Event Dashboard.

## Tech Stack

- Next.js
- TypeScript
- Supabase
- ShadCN UI
- Tailwind v4

## Main Project Structure

```
app/ -> Main application routes/pages, global Tailwind styles, server actions for database interactions
components/ -> ShadCN UI components
lib/ -> Reusable functions for uniformed error handling and tailwind class merges
utils/supabase/ -> Supabase client creation server file
```

## Cloning and Local Development

1. Clone the repository:
```sh
git clone <repository-url>
cd fastbreak-dashboard
```

2. Install dependencies:
```sh
npm install
```

3. Spin up locally at http://localhost:3000:
```sh
npm run dev
```

## Thought Process
Most of the initial setup and technical decisions were already made from challenge description and listed technical requirements. The main focus was keeping things simple and focused on specific features when building each requirement out. Most of the frameworks and packages are things I've used before, but a main focus personally on the functional side was to keep all calls to the database in server components. On the design side, I tried to keep things simple while also displaying the event information in an organized way.

### Questions Asked
If this were a real project, I would get clarification on the following during the planning phase to confirm that business and engineering teams were on the same page:

- Is there a specific list of Sport Types that should be supported? Currently in this app we are keeping it open ended, with a few chosen sports have specific styling.
- Success/Error messaging content for different form submissions and errors.
- Any event data shown on desktop and not on mobile? How to display the venues list when something like the World Cup can have many?
- Should the edit and delete actions be open to any authenticated user or only by the user that created the event?
  - Should the userId be saved with the event data?

## Architecture Decisions
Again, most of the big decisions were made in the project requirements. Some smaller decisions:
- Less useEffect usage where possible. Easy to run into looping issues with state updates.
- Consistent toast messaging:
  - All success and error messages should be more user friendly and readable rather than using the message back from Supabase
  - This also needed the API responses to be consistent and typed
- Debounced search when filtering by event name to cut down on api calls and glitchy UI

## Next Steps
Things I'd want to implement next given more time and project freedom:

- Expand the filters and sorting capabilities to be more user friendly (sorting by date)
- Add component and unit tests for main functionality
- Better design for the page to not look like it was built straight from ShadCN docs (which it basically was)
- Better data validation for form submissions



*** Start: Boilerplate and auto-generated content from the initial Next.js create-next-app CLI ***

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

*** END: Boilerplate and auto-generated content from the initial Next.js create-next-app CLI ***