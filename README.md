# Planetarium
### An interactive 3D visualization of the Solar System inspired by NASA’s “Eyes on the Solar System.”

**Planetarium** is a real-time, browser-based Solar System simulator built with **TypeScript**, **React**, and **Three.js**.  
It allows users to explore the planets in 3D with accurate orbital positions, realistic rotations, and a dynamic time control system.
All orbital motion is computed using custom orbital element processing, ensuring mathematical precision and realism.

## Key Features

- **Real-Time Planetary Positions** — Computed from custom orbital mechanics code
- **Accurate Planetary Rotation and Tilt** — Realistic day-night cycles and axial tilt simulation
- **Interactive Time Control** — Adjust time to view planetary motion across epochs
- **Customizable Orbital Elements** — Modify orbits dynamically and observe real-time changes

- **High-Performance 3D Rendering** — Built with Three.js for smooth visualization
- **Modern Architecture** — Structured with TypeScript and React for scalability and maintainability

## Technical Highlights

- Implements mathematical orbital element calculations (Keplerian elements → Cartesian coordinates)
- **React** handles state management and UI logic for time and orbit controls
- **Three.js** powers real-time rendering, lighting, and object transformations
- **TypeScript** enforces strong typing and reliability across the project

## Getting Started

```bash
git clone https://github.com/rijulpaul/Planetarium.git
cd Planetarium
npm install
npm run dev 
```
