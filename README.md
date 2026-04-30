## PetPost 2.0 (Client)

### Actively improving with Claude AI 👾

### [Sign Up](https://pet-post-client.vercel.app/)

#### ⛔ NOTE ⛔ PetPost has no hard securty or auth checks in place. This is purely a personal project created for fun and learning purposes. Do not sign up with or share any sensitive information.

##### This 2.0 repository aims to enhance PetPost — an earlier, pre-AI project — by improving its functionality, design, and overall user experience utilizing Claude AI.

- A full stack social media application for pets. Built with React, TypeScript, CSS, and Express.
- Designed in [Figma](https://www.figma.com/file/S1QPEz3rVQNjMLCspnZqYz/PetPost?type=design&node-id=0-1&mode=design&t=yD9XkKgQq5gVULbn-0).
- Cloned from [original petpost client](https://github.com/johnyevsukov/pet-post-client)
- Utilizes the [PetPost API](https://github.com/johnyevsukov/pet-post-api).
- Client hosted on [Vercel](https://vercel.com/).
- API hosted on [Heroku](https://www.heroku.com/).
- UI viewable via [Storybook](https://storybook.js.org/) stories.
- Demo account login available for quick testing.

## 🤖 Claude’s Assessment of This Project

Below is an AI-generated review of the project highlighting strengths, weaknesses, and areas for improvement.

---

### ✅ What’s Strong

- **Solid architectural design** using Atomic Design (atoms → molecules → organisms → templates → pages)
- **Well-structured custom hooks** that cleanly separate business logic from UI (`useFeedPosts`, `usePost`, `useProfilePosts`, etc.)
- **Industry-standard stack choices**: TypeScript, Formik, and Yup for form handling
- **Storybook integration** for component documentation and development
- **Good use of `Promise.all`** to parallelize API requests in `usePost`
- Overall structure is comparable to a **junior-level production codebase**

---

### ⚠️ Main Issue

#### N+1 API Request Problem

Each `PostCard` triggers multiple API calls on mount (user data, likes, comments).  
With ~10 posts in a feed, this results in ~30 simultaneous requests.

This is the most significant performance issue in the project.

> You even noted this yourself in `usePost.ts`:
>
> “Ideally this whole hook should not be necessary. Any needed post user data should come from API when initially fetching posts.”

That awareness is a strong signal of good engineering intuition.

---

### 🧩 Smaller Issues / Improvements

- **Hardcoded API URL** in `axiosAuth.ts`  
  → Should use `process.env.REACT_APP_API_URL`

- **Missing React keys** in `comments.map()` (`PostCard.tsx:101`)  
  → Causes React warnings

- **Generic error handling in `Settings.tsx`**  
  → Error message is hardcoded instead of using actual API response

- **Type safety improvement needed in `usePost.ts`**  
  → `useState()` should be explicitly typed (e.g. `useState<string>()`)

- **Security note**  
  → Storing tokens in `localStorage` is vulnerable to XSS (acceptable for portfolio projects, but not production-safe)

---

### 🧾 Overall Summary

This is **well above average for a personal project**.

The architecture, separation of concerns, and tooling choices reflect a developer who understands real-world frontend patterns.

The biggest improvement opportunity is **API efficiency (eliminating the N+1 request pattern)**.

---

## Screen Shots

<img width="1439" alt="Screenshot 2023-08-03 at 11 34 01 PM" src="https://github.com/johnyevsukov/pet-post-client/assets/10480867/2c13bd7d-385e-4b91-b961-368e91794087">
<img width="1440" alt="Screenshot 2023-08-03 at 11 35 20 PM" src="https://github.com/johnyevsukov/pet-post-client/assets/10480867/cf3dd385-66a0-487b-b190-1d3342e9261f">
<img width="1437" alt="Screen Shot 2023-07-30 at 1 02 54 AM" src="https://github.com/johnyevsukov/pet-post-client/assets/10480867/64371ede-fb0f-4574-acfe-f3c50a98305f">
<img width="1439" alt="Screenshot 2023-08-03 at 11 24 01 PM" src="https://github.com/johnyevsukov/pet-post-client/assets/10480867/df0f30d7-d537-4399-b412-8beb94a06d88">
<img width="3026" alt="Screenshot 2023-08-03 at 11 24 01 PM" src="https://github.com/johnyevsukov/pet-post-client/assets/10480867/13f18ae1-fc8a-418a-8711-d9719621d051">

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

To Start Storybook:

`npm run storybook`

To Visit Storybook:

`localhost:6006`
