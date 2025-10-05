# ☕ Find Nearby Cafes

## 🧭 Project Goal
The **Find Nearby Cafes** app is an interactive web map that helps users discover cafes near their current location.  
It uses browser geolocation to find the user’s position and displays nearby cafes from a static JSON file using a mapping library.

---

## 🌟 Core Features

- 🗺️ **Interactive Map:** Uses **Leaflet.js** or **Mapbox GL JS** for map rendering.  
- 📍 **User Location Detection:** On page load, the app requests location permission and centers the map on the user’s coordinates.  
- 🧭 **Markers for Cafes:** Loads data from a static JSON file containing 5–10 cafes, each with latitude, longitude, and name.  
- 💬 **Popups:** Clicking a cafe marker shows a popup with its name.  
- 🔁 **Dynamic Updates:** Handles asynchronous browser geolocation smoothly.

---

## ✨ Bonus Features (Optional Enhancements)

- 🧾 **Cafe List Panel:** Displays a sidebar list of all cafes; clicking a name pans the map to that cafe’s location.  
- ⚙️ **State Management:** Manages selected cafe and map focus state efficiently.  
- 🌐 **Improved UX:** Smooth panning and transitions for better user experience.

---

## 🛠️ Tech Stack

- **HTML5**  
- **CSS3 / TailwindCSS**  
- **JavaScript (ES6+)**  
- **Leaflet.js** or **Mapbox GL JS** (Free Tier)  
- **Static JSON Data Source**

---

## 📂 Folder Structure
find-nearby-cafe/
│── index.html
│── style.css
│── script.js
│── cafes.json
│── assets/
│ └── (icons, markers, etc.)
│── README.md


---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/find-nearby-cafe.git
cd find-nearby-cafe

2️⃣ Setup

Ensure you have an internet connection (Leaflet/Mapbox tiles load online).

Open index.html in your browser.

Allow the browser to access your location when prompted.

3️⃣ JSON Data Example

cafes.json

[
  { "name": "Cafe Mocha", "lat": 18.5204, "lng": 73.8567 },
  { "name": "Blue Bean Coffee", "lat": 18.5310, "lng": 73.8450 },
  { "name": "Brewed Bliss", "lat": 18.5255, "lng": 73.8415 }
]

🧪 Evaluation Criteria
Criteria	Description
Dev Skills & Code Quality	Correct integration of Leaflet/Mapbox, clean async handling for geolocation, and clear state management for markers
Completion	Map loads, centers on user, and displays all cafe markers
Testing	(Optional) Basic unit tests for JSON parsing functions

📜 License

This project is licensed under the MIT License — feel free to use and modify it.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
