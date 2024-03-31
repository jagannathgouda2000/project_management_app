
## Production app link  
[Check out the live version here.](https://project-management-app-xi-six.vercel.app/)

## Getting Started?

Create the .env File:

Navigate to your project's root directory in your terminal.
Use your preferred text editor to create a new file named precisely .env (ensure it has a dot at the beginning). This file will store your actual environment variable values.
Populate the .env File:

Open both the .env.example file and the newly created .env file in your text editor.
Copy the contents from .env.example and paste them meticulously into the .env file. Important: Replace any placeholder values in .env with your actual credentials or configuration settings (e.g., API keys, database connections). Never commit the .env file to your Git repository, as it contains sensitive information.
Install Dependencies:

Open your terminal and navigate to your project's root directory.

Execute the following command to install all the necessary dependencies listed in your project's package.json file (the exact command might vary depending on your project setup):

Bash
npm install  # Example for a Node.js project using npm
  ```
      npm install
  ```
- NEXTAUTH_URL should be for local development "http://localhost:3000" and your domain name in production
- Now run the following command to start the development server, your app should be running in localhost:3000
  ```
      npm run dev
  ```
- run ``npm run db:push``` after making any changes in the prisma schema, incase of error try starting the development server again


![Dashboard](https://project-management-app-xi-six.vercel.app/images/dashboard)
![Homepage](https://project-management-app-xi-six.vercel.app/images/home)
![Conections](https://project-management-app-xi-six.vercel.app/images/members)
![Profile](https://project-management-app-xi-six.vercel.app/images/profile)
![Project Page](https://project-management-app-xi-six.vercel.app/images/project)
![Timeline](https://project-management-app-xi-six.vercel.app/images/timeline)

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
