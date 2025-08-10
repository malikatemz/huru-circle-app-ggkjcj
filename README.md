# HURU Circle App

HURU Circle App is a gamified community platform designed to engage and support teens by rewarding positive actions and participation. Built with TypeScript and leveraging modern frontend technologies, the app combines social features, analytics, and a reward system to create an interactive and motivating environment.

## Features

- **Gamification Dashboard:** Track progress, earn badges, and level up through positive participation and engagement.
- **Rewards System:** Redeem points for rewards such as airtime, books, vouchers, and digital badges. Some rewards require admin approval.
- **User  Profiles:** Manage personal information, privacy settings, and notification preferences (e.g., daily affirmations, reminders, mentor contact).
- **Analytics:** Admins can view engagement metrics, user activity, and content moderation stats.
- **Content Moderation:** Moderation queue and flagged content management for safe and positive interactions.
- **Donations:** Users can make donations via MPesa or card, optionally anonymously.
- **Privacy Controls:** Users control the visibility of their real name and whether mentors can contact them.
- **PWA Support:** Service worker configuration for offline usage and faster load times.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/malikatemz/huru-circle-app-ggkjcj.git
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the app:**
   ```sh
   npm start
   ```

4. **Open the app in your browser:**  
   [Start the HURU Circle App](http://localhost:3000)  
   > By default, the app runs on `localhost:3000`. If you deploy or use a different port, adjust the URL accordingly.

## Project Structure

- `app/(tabs)/`: Main app screens (e.g., profile, progress, etc.)
- `components/`: UI components such as dashboards and settings
- `types/`: TypeScript interfaces for core app entities
- `public/`: Static files and HTML entry point
- `workbox-config.js`: PWA service worker configuration

## Technologies Used

- TypeScript
- React Native / Expo
- Service Workers (Workbox)
- MPesa/Card integration for donations

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project currently does not specify a license.
