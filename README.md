# Old Book Seller Platform

A modern, production-ready frontend application for buying and selling vintage and rare books. Built with React, Redux Toolkit, React Router, Tailwind CSS, and Framer Motion.

## 🚀 Features

### For Customers (Buyers)
- Browse and search vintage books
- Advanced filtering and sorting
- Wishlist management
- Order placement and tracking
- Direct chat with sellers
- User profile management

### For Sellers
- Seller dashboard with analytics
- Add and manage book listings
- Order management (accept/reject)
- Earnings tracking
- Customer communication via chat
- Profile customization

### Technical Features
- **State Management**: Redux Toolkit with createAsyncThunk for all async operations
- **Routing**: React Router with role-based protected routes
- **Styling**: Tailwind CSS with custom vintage book theme
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Mock API**: Fully functional mock services simulating real backend
- **Type Safety**: Clean architecture with proper separation of concerns

## 📁 Project Structure

```
src/
├── api/                    # Axios client configuration
├── app/
│   ├── store.js           # Redux store configuration
│   └── features/slice/    # Redux slices with async thunks
├── components/
│   ├── auth/              # Authentication components
│   ├── user/              # Seller components
│   ├── customer/          # Buyer components
│   ├── books/             # Book-related components
│   └── ui/                # Reusable UI components
├── pages/                 # Page components
│   ├── customer/          # Customer pages
│   └── user/              # Seller pages
├── layouts/               # Layout components
│   ├── MainLayout.jsx
│   ├── CustomerLayout.jsx
│   └── UserLayout.jsx
├── routes/                # Route protection logic
├── services/              # Mock API services
├── hooks/                 # Custom React hooks
├── assets/                # Static assets
└── styles/                # Global styles
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Vite** - Build tool

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Credentials

### Customer Account
- Email: `customer@example.com`
- Password: `password`

### Seller Account
- Email: `seller@example.com`
- Password: `password`

## 🎨 Design Philosophy

- **Vintage Aesthetic**: Warm, book-themed color palette
- **Premium UI**: Glassmorphism, smooth gradients, and elegant animations
- **Mobile-First**: Fully responsive design
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized bundle size and lazy loading

## 🔄 Data Flow

1. **Pages** dispatch Redux actions
2. **Redux Thunks** call service functions
3. **Services** simulate API calls with mock data
4. **Slices** update state based on results
5. **Components** receive data via props from pages
6. **UI Components** render pure presentational logic

## 🚦 Routes

### Public Routes
- `/` - Homepage
- `/books` - Browse books
- `/books/:id` - Book details
- `/login` - Login page
- `/register` - Registration page

### Customer Routes (Protected)
- `/customer/dashboard` - Customer dashboard
- `/customer/orders` - Order history
- `/customer/wishlist` - Saved books
- `/customer/chat` - Messages
- `/customer/profile` - Profile settings

### Seller Routes (Protected)
- `/user/dashboard` - Seller dashboard
- `/user/add-book` - Add new listing
- `/user/listings` - Manage listings
- `/user/orders` - Order requests
- `/user/earnings` - Earnings analytics
- `/user/chat` - Customer messages
- `/user/profile` - Profile settings

## 🎯 Key Patterns

### Redux Slice Pattern
Each slice follows this structure:
- Initial state
- Async thunks using `createAsyncThunk`
- Slice with reducers and extra reducers
- Export actions and reducer

### Component Pattern
- UI components are pure and receive props
- Pages handle Redux dispatch and selectors
- Layouts provide consistent structure
- Protected routes handle authentication

### Service Pattern
- Mock delay to simulate network
- Realistic data responses
- Error handling
- Type-safe interfaces

## 🎨 UI Components

- **Button** - Multiple variants with loading states
- **Card** - Hover animations
- **Input** - Form validation support
- **Modal** - Animated overlays
- **Toast** - Notifications
- **Loader** - Loading indicators
- **Badge** - Status indicators
- **EmptyState** - No-content states
- **SkeletonLoader** - Loading placeholders

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔮 Future Enhancements

- Real backend API integration
- Payment gateway integration
- Advanced search with Elasticsearch
- Real-time chat with WebSockets
- Image upload for book covers
- Reviews and ratings system
- Advanced analytics dashboard
- Email notifications
- Social media integration

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and Redux Toolkit

# Brookhaven
