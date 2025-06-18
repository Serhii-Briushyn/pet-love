# PetLove - Animal Adoption Platform

PetLove is a responsive web application that helps users find pets, manage personal profiles, and interact with community notices. It includes features such as authentication, favorite management, pagination, and filtered search.

![PetLove Preview](./public/images/home-page/desktop-img.jpg)

## Features

- 🐾 **Responsive Design:** Optimized for mobile (320px+), tablet (768px+), and desktop (1280px+).
- 💡 **Retina-Ready UI:** Retina images and sprite icons included.
- 🧠 **Authentication System:** Register, login, and logout with persistent state.
- 🔐 **Private Routes:** Profile and Add Pet pages are protected.
- 🔎 **Filtered Search:** Search by city, species, sex, and category with instant feedback.
- 📰 **Notices Page:** Browse, favorite, and view detailed pet listings.
- 🐶 **Add Pet:** Authenticated users can add and delete pets with image preview.
- 🧾 **News Page:** View latest news with search and pagination.
- 🤝 **Friends Page:** Directory of partner organizations with contact links.
- ⚙️ **Profile Management:** Edit profile, manage pets, and view saved notices.
- 🎨 **Theme & Color Switcher:** Switch between dark/light themes and pick accent colors using the floating settings panel.

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/Serhii-Briushyn/petlove.git
```

2. Install dependencies:

```bash
 cd petlove
 npm install
```

3. Start the development server:

```bash
 npm run dev
```

## Technologies Used

- **React & TypeScript** – SPA with strict typing.
- **Vite** – Modern fast dev server and bundler.
- **Tailwind CSS** – Utility-first styling with responsive support.
- **React Router** – For routing and route protection.
- **Redux Toolkit** – Centralized state management.
- **react-hook-form & Yup** – Form handling and validation.
- **react-select** – For city selector with async options.
- **Framer Motion** – For animations.
- **react-hot-toast** – For error and success messages.

## Configuration

Create a `.env` file in the root directory with backend API:

```bash
 VITE_API_BASE_URL=https://petlove.b.goit.study/api
```

## Project Structure

### `src/pages`

- `Home`: Landing page with banner and info.
- `News`: News list with search and pagination.
- `Notices`: Main content page with filters and modal interactions.
- `Friends`: List of friendly organizations.
- `Register`: Registration form.
- `Login`: Login form.
- `Profile`: User dashboard with pets and favorites.
- `AddPet`: Page for adding new pets.
- `NotFoundPage`: Fallback for unknown routes.

### `src/components`

- `Header`: Contains logo, navigation, and auth/user links.
- `Navigation`: Page links (mobile/desktop variants).
- `UserBar`: Displays user info and profile link.
- `LogOutBtn`: Opens logout modal.
- `PetBlock`: Static image block.
- `SearchField`: Reusable search input.
- `NoticesFilters`: Filters panel with selects, radio, and search.
- `Pagination`: Shared pagination component.
- `NoticesItem`: Pet card with actions.
- `NewsItem`, `FriendsItem`, `PetsItem`: Item components for lists.
- `Modals`: `ModalNotice`, `ModalAttention`, `ModalApproveAction`, `ModalEditUser`
- `FormButton`: Styled button for form submits.
- `StyleSwitcher`: Floating panel for toggling theme and accent color.
- `ThemeToggle`: Dark/light mode toggle with localStorage sync.
- `ColorPicker`: Selects and applies custom accent colors.

### `src/store`

- Redux slices for user, pets, notices, news, UI state.
- Async thunks for API interaction.

### `src/hooks`

- Custom hooks for filters, debounce, auth, etc.

### `src/utils`

- Helper functions for formatting, error handling, etc.

### `src/types`

- Global and domain-specific types.

## Usage

- Use filters on `/notices` to refine pet listings.
- Add pets via `/add-pet` if logged in.
- Manage favorites and viewed from `/profile`.
- Search news via `/news`.
- View partner info via `/friends`.
- Use the floating ⚙️ settings panel (right side) to switch between light/dark themes and customize accent colors.

## Author

PetLove is developed and maintained by **Serhii Briushyn**.

## License

This project is licensed under the MIT License.
