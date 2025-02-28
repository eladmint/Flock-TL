# Flock: Twitter Campaign Management Platform

Flock is a streamlined social media management tool that enables users to create, schedule, and manage Twitter campaigns through an intuitive dashboard interface.

## Features

- Clean dashboard interface showing campaign overview with stats and upcoming scheduled posts
- Campaign management system with ability to create, edit and organize scheduled tweets
- Post editor with character counter and scheduling functionality
- Pre-scheduled likes feature allowing users to automatically like posts when published
- Twitter-only authentication via Auth0 with seamless Supabase integration

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account
- Auth0 account with Twitter social connection

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/flock.git
   cd flock
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your Supabase credentials

4. Start the development server
   ```
   npm run dev
   ```

## Deployment to Vercel

1. Push your code to a GitHub repository

2. Connect your repository to Vercel

3. Configure the following environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Deploy!

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Supabase
- Auth0

## License

This project is licensed under the MIT License - see the LICENSE file for details.
