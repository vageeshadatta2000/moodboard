# MoodBoard AI

MoodBoard AI is a stunning, web-based application that transforms your creative ideas into beautiful, AI-generated mood boards. Simply enter a theme or a concept, and watch as a unique collection of high-quality, relevant images comes to life. With a sleek, modern interface and powerful features, it's the perfect tool for designers, artists, and anyone seeking visual inspiration.

## ✨ Key Features

*   **AI-Powered Image Generation**: Leverages a powerful generative AI model to create unique, high-quality images based on your text prompts.
*   **Dynamic & Aesthetic UI**: Features a live, animated gradient background and a "frosted glass" layout for a modern and immersive experience.
*   **Interactive Viewer**: Click on any image to open a full-screen modal, allowing you to view details and download the image directly.
*   **"Surprise Me" Feature**: Feeling stuck? Use the magic wand to generate a random, creative prompt to spark new ideas.
*   **Persistent Prompt History**: Your recent themes are automatically saved, allowing you to easily revisit and regenerate past mood boards.
*   **Shareable Mood Boards**: Generate a unique link for any mood board and share your vision with friends, clients, or collaborators.

## 🚀 Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Generative AI**: Utilizes the `imagen-4.0-generate-001` model for high-quality image generation.

## Local Development

Follow these steps to get MoodBoard AI running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/moodboard-ai.git
    cd moodboard-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up your Environment Variable:**
    You'll need a Generative AI API key to power the image generation.

    *   Create a new file named `.env.local` in the root of your project.
    *   Add your API key to this file:

    ```
    VITE_API_KEY="your_api_key_here"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or the next available port).

## 🌐 Deploying Online with Vercel

You can deploy your own instance of MoodBoard AI to the web in just a few steps using Vercel.

1.  **Push to GitHub:**
    Create a new repository on GitHub and push your local project code to it.

2.  **Import Project on Vercel:**
    *   Log in to your [Vercel](https://vercel.com/) account.
    *   Click "Add New..." -> "Project".
    *   Import your GitHub repository. Vercel will automatically detect that it is a Vite project.

3.  **Configure Environment Variable:**
    *   In your new Vercel project's dashboard, go to **Settings** -> **Environment Variables**.
    *   Add a new variable with the following details:
        *   **Name**: `VITE_API_KEY`
        *   **Value**: Paste your Generative AI API key here.
    *   Save the variable.

4.  **Deploy:**
    *   Navigate to the "Deployments" tab and trigger a new deployment.
    *   Vercel will build and deploy your application. Once finished, you'll have a public URL for your live MoodBoard AI app.

## 🎨 How to Use

*   **Generate a Board**: Type a theme (e.g., "Bohemian desert oasis at sunset") into the input field and click "Generate".
*   **Get Inspired**: Click the magic wand icon for a random, creative prompt.
*   **Reuse a Prompt**: Click on any theme in the "Recent Themes" section to load it.
*   **View & Download**: Click any image in the grid to open a larger view. Use the "Download" button inside this view.
*   **Share**: Once a board is generated, click the "Share Board" button to copy a unique, shareable link to your clipboard.

## 📂 Project Structure

A brief overview of the key files and directories.

```
/
├── src/
│   ├── components/      # Reusable React components (Pin, Modal, Spinner, etc.)
│   ├── services/        # API service for AI generation (geminiService.ts)
│   ├── App.tsx          # Main application component and state management
│   ├── index.tsx        # React application entry point
│   └── types.ts         # TypeScript type definitions
├── .env.local           # Local environment variables (untracked by Git)
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```
