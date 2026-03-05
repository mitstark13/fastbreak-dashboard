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

## Docs
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [ShadCN documentation](https://ui.shadcn.com/docs)
- [Supabase documentation](https://supabase.com/docs)
- [Tailwind documentation](https://tailwindcss.com/docs)