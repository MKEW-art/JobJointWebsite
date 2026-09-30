# JobJoint

JobJoint helps people in Ethiopia find local service professionals and request help for work around their homes and neighbourhoods.

## Project team

- **Muhammed Kemal** - Lead full-stack developer and primary website creator
- **Abdulkaf Musema** - Frontend contributor
- **Nusra Fedlu** - Content and user experience contributor
- **Lina Bilal** - Interface feedback contributor
- **Seadedin Hayredin** - Documentation and review contributor

## The problem

People looking for local help can have a hard time finding a suitable professional, learning about their experience, and arranging a service. Independent professionals also need a clear way to present their work and receive requests. JobJoint is designed for customers and service professionals in Ethiopia.

## What it does

- Lets customers browse and search professionals by service and location.
- Shows professional profiles with contact details, experience, work samples, certificates, and awards.
- Supports separate customer and professional accounts.
- Lets customers send service requests and track their status.
- Gives professionals a dashboard to review, accept, or decline requests.
- Lets signed-in users manage their profile and profile photo.

## How to run it

Requirements: Node.js 20 or newer, npm, and MongoDB running locally or an Atlas database.

From a fresh clone, open PowerShell in the project folder and run:

```powershell
npm.cmd install
Copy-Item backend/.env.example backend/.env
notepad backend/.env
```

In `backend/.env`, set `MONGODB_URI` to your MongoDB connection string and replace `JWT_SECRET` and `JWT_REFRESH_SECRET` with different random values of at least 32 characters. Save the file. Start MongoDB if it is local.

Start both the API and website together from the project folder:

```powershell
npm.cmd run dev
```

Wait until the API logs `JobJoint API listening` and Vite prints its local URL. Open the Vite URL, usually `http://localhost:5173`. During development, Vite forwards `/api` and `/uploads` requests to the API at port 4000, so the local website also works if Vite chooses a different port. The API health check is `http://localhost:4000/api/health`. Stop both services with `Ctrl+C`.

To run the API alone in a separate terminal, use:

```powershell
npm.cmd run dev:api
```

To run only the frontend demo without the API, use `npm.cmd run dev:web`.

Optional demo data: before starting the API, run `npm.cmd run seed --workspace backend` from a PowerShell window at the project root. This creates demo customers and professionals in the configured database. The default password is `JobJointDemo2026!`; set `DEMO_PASSWORD` in `backend/.env` to choose another. The seed command replaces existing seeded demo accounts.

## Built with

- TypeScript, React, and Vite for the website.
- TypeScript and Express for the API.
- MongoDB and Mongoose for application data.
- Zod for request validation, bcryptjs for password hashing, and JSON Web Tokens for sessions.
- REST API calls between the frontend and backend.

## Demo

**Live site:** Not deployed. Hosting is optional for this project.

**Run it locally:** Follow the steps in [How to run it](#how-to-run-it). The frontend opens at `http://localhost:5173` and the API health check is at `http://localhost:4000/api/health`.

**Submission evidence:** 

Screen Recording:
https://drive.google.com/file/d/1RQybfgaof8Q08v8AAAMgbSB4v8rr4hNR/view?usp=drivesdk

## Contributions

- **Muhammed Kemal** - Led and built most of JobJoint, including the frontend, backend API, database integration, authentication, service-request flows, and profile features.
- **Abdulkaf Musema** - Made a contribution to frontend pages or interface components.
- **Nusra Fedlu** - Offered supporting suggestions about website content and user experience.
- **Lina Bilal** - Offered feedback on the website interface and presentation.
- **Seadedin Hayredin** - Helped review the project and README documentation.



## What we would build next

- Add customer reviews and ratings so customers can share feedback after completed work.
- Add in-app messaging and notifications to help customers and professionals coordinate requests.
- Configure Google sign-in and deploy managed photo storage for a production release.
