# Andria's Interactive Portfolio

Welcome to my interactive and visually rich personal portfolio, built with React, TypeScript, and a host of modern web technologies. This project is not just a showcase of my work, but also a playground for advanced animations and user interface experiments.

**[View Live Demo](https://andriagv.github.io/AndriaLife/)**

## Features

- **Dynamic Content:** Content is dynamically loaded and displayed based on category selection (iOS, Camps, Academics, Design, etc.).
- **Multi-language Support:** Fully bilingual, supporting both English and Georgian, with a seamless language toggle.
- **Advanced Animations:**
  - **WebGL Particles:** A beautiful, interactive particle animation on the hero section.
  - **Spline 3D Integration:** An interactive 3D model integrated into the hero section.
  -**Scroll-based Animations:** Engaging timeline components for showcasing academic and mathematical journeys.
  - **Custom Cursor Effects:** Unique cursor effects like "Splash" and "Target" cursors for enhanced user interaction.
- **Theme-aware:** Supports both light and dark modes, with all components styled accordingly.
- **Customizable Experience:** A settings panel allows users to toggle heavy animations (like particles and cursors) to match their hardware capabilities.
- **Responsive Design:** Fully responsive layout, optimized for a great experience on both desktop and mobile devices.
- **Component-Based Architecture:** Built with reusable and modular components using Shadcn/UI and custom components.

## Technologies Used

### Core Technologies
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** A fast build tool and development server.

### UI & Styling
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn/UI:** A collection of beautifully designed, reusable components.
- **Framer Motion:** A powerful library for creating fluid animations.
- **Lucide React:** A comprehensive library of simply beautiful icons.

### State Management
- **React Context API:** Used for managing global state like theme, language, and application state.

### Animations & Graphics
- **OGL (OpenGL library):** A small, effective WebGL library used for the particle animations.
- **GSAP (GreenSock Animation Platform):** A robust JavaScript toolset for professional-grade animations.
- **Spline:** A 3D design tool used for creating and integrating the interactive 3D scene.
- **Three.js:** A 3D graphics library that powers the Spline integration.

### Other Libraries
- **React Router:** For declarative routing in the application.
- **React Hook Form:** For managing forms with ease.
- **Sonner:** A toast notification library for displaying non-intrusive messages.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/andriagv/AndriaLife.git
   cd AndriaLife
   ```

2. **Install dependencies:**
   *Note: If you are using `nvm` (Node Version Manager), first run `nvm use` to switch to the correct Node.js version specified in the `.nvmrc` file.*
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

Here is a brief overview of the key directories in this project:

- **`public/`**: Contains static assets like fonts, images, and music files.
- **`src/`**: The main source code directory.
  - **`components/`**: Contains all the React components, organized by feature and reusability.
    - **`common/`**: Shared, reusable components used across the application.
    - **`projects/`**: Components specifically for the projects section.
    - **`ui/`**: UI components from Shadcn, and other custom UI elements.
  - **`contexts/`**: Contains all the React context providers for state management (Theme, Language, etc.).
  - **`data/`**: Static data files, such as the list of projects.
  - **`hooks/`**: Custom React hooks for shared logic.
  - **`services/`**: Services for fetching and processing data.
  - **`utils/`**: Utility functions, including the `translations.ts` file for multi-language support.
- **`README.md`**: This file, providing information about the project.
- **`package.json`**: Lists the project's dependencies and scripts.
- **`vite.config.ts`**: The configuration file for Vite.

## Acknowledgements

A big thank you to the creators of the various open-source libraries and tools that made this project possible. Special mentions to:
- The **Shadcn/UI** team for their excellent component library.
- The **Framer Motion** team for making web animations so intuitive.
- The **Three.js** and **OGL** communities for their amazing work in WebGL.

## The Role of AI in this Project

Despite my minimal knowledge of TypeScript, creating this project independently without AI support would have been practically impossible.

The initial structure (skeleton) of the project was created on **Lovable.ai**. The core backend and client base were developed using **Cursor**, which significantly simplified working with the code.

For integrating visual effects, I actively used AI-developed tools such as:

- **dora.run/ai** – for generating interactive animations and visual scenes.
- **reactbits.dev** – for inserting ready-made React components.
- **lightswind.com** – for modern UI elements and animations.

For generating content ideas, I used **ChatGPT**, and for ensuring linguistic accuracy of the text, I used **Claude AI**. To fix technical errors that arose during the project, I often turned to **Gemini**, which effectively helped in diagnosing and fixing bugs.
