
# Direct. - AI-First Data Operations Platform

**Direct** is a next-generation data operations dashboard that orchestrates asynchronous human-in-the-loop (HITL) workflows with real-time AI verification.

Built with **Next.js 14** (App Router), **Tailwind CSS**, and **Framer Motion**, it features a "2026 Enterprise" design system focused on high information density, glassmorphism, and seamless micro-interactions.

![Direct Dashboard Preview](public/dashboard-preview.png)

## 🚀 Key Features

### 1. Command Center (Bento Grid Layout)
- **High-Density Execution Queue**: A dense, expanding data table that handles complex task states (Draft → In Progress → Verifying → Completed).
- **Live AI Audit Stream**: A dedicated terminal-style sidebar that streams real-time logs from the AI verification agents, building trust with the user.
- **Glassmorphism UI**: Uses `backdrop-filter: blur(12px)` and subtle 1px translucent borders to create a layered, depth-rich interface suitable for dark mode professional tools.

### 2. The "Architecture of Trust"
- **Transparent AI Verification**: Tasks aren't just "completed"; they go through a "Verifying" stage where an AI agent audits the work.
- **Detailed Forensic Reports**: Clicking any task reveals a "Slide-over Drawer" containing a `VerificationReport`—a checklist of specific logic gates (e.g., "Schema Validation", "Plagiarism Scan", "Tone Check") that the work passed or failed.
- **Human-in-the-Loop**: Includes a "Dispute AI Verdict" workflow, emphasizing that humans remain the final authority.

### 3. Technical Highlights
- **Client-Side Interactivity**: Uses React Client Components for rich interactions like filtering and drawer animations, while keeping the initial data fetch server-side optimized.
- **Responsive Animations**: Framer Motion powers smooth entry transitions and layout shifts (e.g., when the Activity Sidebar updates).
- **Mock Data Simulation**: A robust `mock-data.ts` library simulates a complex backend state, making the project "Demo Ready" for portfolios with zero setup.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the dashboard**:
   Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 🎨 Design Philosophy
The UI follows a "Dark Mode 2.0" aesthetic, prioritizing:
- **Depth over Flatness**: Using radial gradients and blur to imply hierarchy.
- **Information over Whitespace**: Denser layouts that respect the user's need for data.
- **Motion as Feedback**: Every click, hover, and state change has a corresponding micro-interaction.
