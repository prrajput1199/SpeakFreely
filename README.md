<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>

  <h1>🚀 Speak Freely</h1>

  <p><strong>Speak Freely</strong> is a web app that lets users create an account and receive anonymous feedback through a personalized link. Built with <strong>Next.js</strong>, it supports email verification, anonymous messaging, dark/light mode, and even suggests helpful feedback via the Gemini API.</p>

  <h2>✨ Features</h2>
  <ul>
    <li> Email-based user authentication (NextAuth + Resend)</li>
    <li> Unique anonymous feedback link for each user</li>
    <li> Dashboard to view all received feedbacks</li>
    <li> Enable or disable feedback at any time</li>
    <li> Real-time username availability check while typing</li>
    <li> Light and Dark Mode toggle</li>
    <li> Smooth UI animations with Framer Motion</li>
  </ul>

  <h2>🛠 Tech Stack</h2>
  <ul>
    <li><strong>Framework:</strong> Next.js (App Router)</li>
    <li><strong>Authentication:</strong> NextAuth</li>
    <li><strong>Email Verification:</strong> Resend</li>
    <li><strong>AI Integration:</strong> Gemini API</li>
    <li><strong>Styling & Animation:</strong> Tailwind CSS, Framer Motion</li>
    <li><strong>Deployment:</strong> Vercel </li>
  </ul>

  <h2>📦 Getting Started Locally</h2>
  <p>Follow these steps to run the app on your local machine:</p>

  <ol>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/prrajput1199/speak-freely.git</code></pre>
    <li>Navigate to the project folder:</li>
    <pre><code>cd feebackapp</code></pre>
    <li>Install dependencies:</li>
    <pre><code>npm install</code></pre>
    <li>Create a <code>.env.local</code> file in the root and add the following environment variables:</li>
    <pre><code>
      MONGODB_URL= ""
      RESEND_API_KEY= ""
      NEXTAUTH_SECRET = ""
      NEXTAUTH_URL= "http://localhost:3000"
      GEMINI_API_KEY=""
    </code></pre>
    <li>Run the development server:</li>
    <pre><code>npm run dev</code></pre>
    <li>Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser.</li>
  </ol>

  <h2>🚀 Deployment</h2>
  <p>Deploy the app easily with <a href="https://vercel.com" target="_blank">Vercel</a>. Just connect your GitHub repository, add your environment variables, and you're good to go!</p>

  <h2>🙌 Contributing</h2>
  <p>Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.</p>

</body>
</html>
