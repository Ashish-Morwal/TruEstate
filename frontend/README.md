# Frontend - Sales Dashboard UI

React-based frontend for the Sales Dashboard application with interactive UI components and real-time data visualization.

## Overview

A modern, responsive sales dashboard built with React 18, TypeScript, and Tailwind CSS. Features interactive filtering, sorting, pagination, and data visualization using Recharts.

## Technology Stack

- **Framework**: React 18.3
- **Language**: TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/ui (Radix UI)
- **Data Fetching**: TanStack React Query
- **Routing**: Wouter
- **Form Handling**: React Hook Form
- **Charts**: Recharts
- **Validation**: Zod
- **Icons**: Lucide React, React Icons

## Project Structure

```
src/
├── components/
│   ├── sales/
│   │   ├── TransactionTable.tsx    # Main transaction display table
│   │   ├── FilterPanel.tsx         # Advanced filter controls
│   │   ├── SearchBar.tsx           # Search functionality
│   │   ├── SortingDropdown.tsx     # Sorting controls
│   │   ├── PaginationControls.tsx  # Pagination UI
│   │   ├── StatusBadge.tsx         # Status indicators
│   │   ├── StatsCard.tsx           # Statistics display
│   │   ├── LoadingSkeleton.tsx     # Loading placeholders
│   │   ├── EmptyState.tsx          # Empty state UI
│   │   ├── FilterCheckboxGroup.tsx # Filter checkboxes
│   │   ├── FilterDropdown.tsx      # Filter dropdown
│   │   ├── RangeInput.tsx          # Range input field
│   │   ├── AppSidebar.tsx          # Sidebar navigation
│   │   └── examples/               # Component examples
│   └── ui/                         # Shadcn/ui components
├── pages/
│   ├── Dashboard.tsx               # Main dashboard page
│   └── not-found.tsx              # 404 page
├── hooks/
│   ├── use-toast.ts               # Toast notifications
│   └── use-mobile.tsx             # Mobile detection
├── lib/
│   ├── queryClient.ts             # React Query setup
│   └── utils.ts                   # Utility functions
├── services/
│   └── api.ts                     # API client
├── utils/
│   └── helpers.ts                 # Helper functions
├── styles/
│   └── globals.css                # Global styles
├── routes/
│   └── routing.tsx                # Route definitions
├── App.tsx                        # Root component
├── main.tsx                       # Entry point
└── index.css                      # Main styles
```

## Setup

### Prerequisites

- Node.js v18+
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure API endpoint** (if needed)
   - Backend should be running on `http://localhost:5000`
   - Update API calls in `services/api.ts` if different

## Development

### Start Development Server

```bash
npm run dev
```

Vite dev server will open at `http://localhost:5173`

### Type Checking

```bash
npm run check
```

## Production

### Build

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Features

### Dashboard

- **Transaction Management**: View, filter, and search transactions
- **Advanced Filtering**: Filter by region, gender, category, age range, and date
- **Sorting**: Sort by any column (ascending/descending)
- **Pagination**: Efficient pagination with customizable page size
- **Statistics**: Real-time transaction statistics and insights
- **Responsive Design**: Mobile-friendly layout
- **Empty States**: Helpful messaging when no data
- **Loading States**: Skeleton loaders for better UX

### Components

#### Sales Components

- `TransactionTable` - Main data table with sorting and selection
- `FilterPanel` - Comprehensive filter controls
- `SearchBar` - Quick search across customer data
- `SortingDropdown` - Column sorting control
- `PaginationControls` - Page navigation
- `StatusBadge` - Visual status indicators
- `StatsCard` - Statistics display cards
- `LoadingSkeleton` - Loading state placeholders
- `EmptyState` - Empty data state UI

#### UI Components (Shadcn/ui)

- Accordion, Alert, Alert Dialog
- Avatar, Badge, Breadcrumb
- Button, Calendar, Card, Carousel
- Chart, Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer
- Dropdown Menu, Form, Hover Card
- Input, Input OTP, Label, Menubar
- Navigation Menu, Pagination, Popover
- Progress, Radio Group, Resizable
- Scroll Area, Select, Separator, Sheet
- Sidebar, Skeleton, Slider, Switch
- Table, Tabs, Textarea, Toast
- Toggle, Toggle Group, Tooltip

## API Integration

### Query Client Setup

React Query is configured for optimal data fetching with:

- Request caching
- Automatic refetching
- Error handling
- Loading states

### API Endpoints Used

```
GET /api/transactions       # Fetch transactions
GET /api/transactions/stats # Get statistics
GET /api/filter-options    # Get filter options
```

## Styling

### Tailwind CSS

- Custom color scheme
- Responsive breakpoints
- Dark mode support with next-themes
- Animation utilities

### Component Styling

- CSS modules where needed
- Inline Tailwind classes for flexibility
- Consistent color and spacing system

## Form Handling

Uses React Hook Form for:

- Efficient form rendering
- Built-in validation with Zod
- Error handling and display
- Minimal re-renders

## Toast Notifications

Custom toast hook for user feedback:

```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
});
```

## Hooks

### Custom Hooks

- `useToast()` - Display notifications
- `useMobile()` - Detect mobile viewport

### React Query Hooks

- `useQuery()` - Fetch data
- `useInfiniteQuery()` - Pagination
- `useMutation()` - Modify data

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance
- Form labels and error messages

## Performance Optimization

- Code splitting with Vite
- Lazy loading of routes
- Memoization of components
- Optimized re-renders
- Image optimization

## Troubleshooting

### API Connection Issues

- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify API endpoint in `services/api.ts`

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.ts` for path includes
- Rebuild if custom colors not appearing

## Environment Variables

Create `.env.local` if needed:

```
VITE_API_BASE_URL=http://localhost:5000
```

## Contributing

When extending the frontend:

1. Follow component structure conventions
2. Use TypeScript for all new files
3. Add proper error handling
4. Test responsive design
5. Maintain accessibility standards

## License

MIT
