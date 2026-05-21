# Health App (Expo + Expo Router)

A small starter mobile app built with Expo and `expo-router`. Includes a simple authentication context, example screens (home, login, register), and an app layout wired via file-based routing in the `app/` directory.

## Features

- File-based routing with `expo-router`
- Authentication context using `AuthContext`
- Example screens: Home, Login, Register
- Uses Expo modules for status bar, splash screen and linking

## Tech stack

- Expo
- React Native
- expo-router
- AsyncStorage for token persistence
- Axios for HTTP requests

## Requirements

- Node.js (16+ recommended)
- Yarn or npm
- Expo CLI (optional but convenient): `npm install -g expo-cli`

## Quick start

1. Install dependencies

```bash
npm install
# or
yarn install
```

2. Run the app

```bash
npm run start
# then press 'a' (Android), 'i' (iOS), or open the Expo Go app
```

Or run a platform-specific script:

```bash
npm run android
npm run ios
npm run web
```

## Project structure

- [app/](app/) — Application routes and screens
	- [app/_layout.js](app/_layout.js) — Root layout and navigation setup
	- [app/home.js](app/home.js) — Home screen
	- [app/index.js](app/index.js) — Index route (redirect / landing)
	- [app/login.js](app/login.js) — Login screen
	- [app/register.js](app/register.js) — Register screen
- [app/assets/](app/assets/) — Images and static assets
- [app/context/](app/context/) — React context providers
	- [app/context/AuthContext.js](app/context/AuthContext.js) — Authentication context and persistence
- [package.json](package.json) — Scripts and dependencies

## Authentication

This project includes an `AuthContext` to manage authentication state and token persistence (using AsyncStorage). The context is wired into the app layout so screens can read auth state and trigger login/logout flows.

If you want to connect to a real backend:

- Update API base URLs in the code that uses `axios`.
- Ensure your backend returns a token that the app can store and include in subsequent requests.

## Configuration & environment

This starter doesn't include dotenv or environment management. For real projects, add a secure way to inject API URLs / keys (e.g., using `expo-constants` + build-time configuration or a small config file excluded from source control).

## Scripts

See `package.json` for available scripts. Common commands:

- `npm run start` — Start the Expo dev server
- `npm run android` — Start and open on Android
- `npm run ios` — Start and open on iOS
- `npm run web` — Run as a web app

## Contributing

Contributions are welcome. For new features or fixes:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description and testing steps

## License

This project has no license specified. Add a `LICENSE` file if you want to make the project open source.

## Contact

Questions or help — open an issue or contact the maintainer.

---

If you'd like, I can also:

- Add environment/config support
- Add unit or integration tests
- Wire a sample backend endpoint for authentication

Tell me which of the above you'd like next.
