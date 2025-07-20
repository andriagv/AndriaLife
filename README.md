# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c87fc65d-3676-49b0-a2f0-d967d8feae4c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c87fc65d-3676-49b0-a2f0-d967d8feae4c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Getting Started Locally

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at the URL shown in your terminal (usually http://localhost:5173).

---

## Recommended VSCode Setup

To avoid warnings about Tailwind CSS directives (like `@tailwind` and `@apply`) and get the best developer experience, do the following:

1. **Install the Tailwind CSS IntelliSense extension:**
   - Open VSCode Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Search for `Tailwind CSS IntelliSense` and install it.

2. **(Optional, but recommended) Add this to your `.vscode/settings.json` to silence CSS linter warnings:**
   ```json
   {
     "css.lint.unknownAtRules": "ignore"
   }
   ```
   This is already included in this repo, but if you use a different editor, you may need to configure it yourself.

---

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

## 3D Animated Background (Spline, WebGL, Three.js, Polygonjs)

This project features a fully interactive 3D animated background, visible on every page and section. The background is implemented using [Spline](https://spline.design), a powerful visual tool for creating and exporting 3D scenes for the web. The integration is achieved via the [`@splinetool/react-spline`](https://www.npmjs.com/package/@splinetool/react-spline) React component, which renders the exported Spline scene as a performant WebGL canvas.

**How it works:**

- The Spline scene is created visually in the Spline editor, where you can design, animate, and configure 3D objects, lighting, and camera movement.
- The scene is exported and embedded in the React app using the `<Spline scene="..." />` component, which internally uses WebGL and Three.js for rendering.
- The background is set to be fixed, full-screen, and always behind all content, providing a seamless animated experience across all sections (including About, Category Selection, Projects, and Footer).
- The Spline engine leverages [Three.js](https://threejs.org/) under the hood for 3D rendering, and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) for hardware-accelerated graphics in the browser.

**Why interactive 3D?**

Interactive 3D is now everywhere: scientific visualizations, product showcases, video games, digital twins, configurators, and digital art. These experiences are difficult to create, requiring both 3D and web expertise. Tools like Spline and Polygonjs simplify this process by providing integrated, easy-to-use, and extensible solutions for building beautiful and performant 3D web experiences.

**Polygonjs** is another tool that helps you create interactive 3D for the web, making it easier to build complex scenes without deep knowledge of 3D programming. It is especially useful for scientific, artistic, and product visualization use cases.

**Other technologies for 3D on the web:**
- [Three.js](https://threejs.org/): The most popular JavaScript 3D library, used for custom 3D scenes and advanced graphics.
- [Dora](https://dora.run/): A platform for deploying and running AI/3D applications.
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API): The browser API for rendering 2D and 3D graphics.

---

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c87fc65d-3676-49b0-a2f0-d967d8feae4c) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)


dora.run/ai 

modulify.ai

reactbits.dev  გამოვიყენო მზა კოდი და ჩავსვი პროექტში

https://www.lightswind.com/  გამოვიყენო მზა კოდი და ჩავსვი პროექტში
