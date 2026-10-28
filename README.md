# MIRRORED — Luxury Beauty & Wellness Website

A responsive React + Vite website concept for **Mirrored — The House of Aesthetics & Wellness**, Brusubi, The Gambia.

## Included
- Premium black, gold, and ivory visual design
- Responsive navigation and mobile layout
- 3D-inspired hero parallax, floating orbs, animated rings, subtle glints, and elevated hover effects
- Treatment menu with category filters and illustrative pricing
- Signature package cards and gift-voucher enquiry links
- Image gallery linking to Mirrored's Instagram
- Contact/location section with WhatsApp and map links
- Appointment request form that saves a local demo record and opens WhatsApp with a pre-filled message
- Demo customer profile and local admin booking dashboard
- Reduced-motion accessibility support

## Run in VS Code
1. Extract the downloaded ZIP.
2. Open the extracted `mirrored-salon` folder in Visual Studio Code.
3. Open **Terminal → New Terminal**.
4. Install Node.js 20+ if you have not already: https://nodejs.org/
5. Run:
   ```bash
   npm install
   npm run dev
   ```
6. Open the local URL shown in the terminal (normally `http://localhost:5173`).

## Build the production frontend
```bash
npm run build
npm run preview
```
Vite creates the production frontend in `dist/`.

## Before launching publicly
This is a **front-end prototype**, not a fully deployed business system. Confirm all service names, prices, address details, opening hours, and the WhatsApp number with the business. The gallery currently uses illustrative Unsplash images; replace these with approved Mirrored photos.

Booking requests and the demo customer profile are stored only in the visitor's browser using `localStorage`. They are not shared with staff or other devices. The admin screen is a demonstration and is not password-protected. Do not publish it as a real admin system. A real launch needs a secure backend/database, authenticated staff/admin access, server-side validation, privacy/consent information, and a shared booking workflow. The form opens WhatsApp to request confirmation; it does not confirm appointments automatically.

The website loads fonts and stock imagery online, so an internet connection is required for those assets.
