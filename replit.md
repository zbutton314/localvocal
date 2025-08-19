# Local Vocal - Kansas City Choral Directory

## Overview

Local Vocal is a full-stack web application that serves as a comprehensive directory for choral organizations in the Kansas City metro area. The platform allows users to discover vocal ensembles, browse upcoming concerts, and explore the vibrant choral music scene. Built with modern web technologies, it provides an intuitive interface for connecting singers with local choral opportunities and helping audiences find performances to attend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built using **React 18** with **TypeScript** for type safety. The application follows a component-based architecture with:
- **Routing**: Wouter for lightweight client-side routing with support for parameterized routes
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Theme System**: Custom theme provider supporting light/dark mode with persistent preferences

The frontend follows a feature-based folder structure with reusable components, pages, and utilities organized logically. Path aliases are configured for clean imports (@/, @shared).

### Backend Architecture  
The server is built with **Express.js** using TypeScript in ESM format. Key architectural decisions:
- **API Design**: RESTful endpoints following resource-based URL patterns (/api/organizations, /api/concerts)
- **Data Layer**: Abstracted storage interface (IStorage) allowing for different implementations (currently in-memory storage with seed data)
- **Error Handling**: Centralized error middleware with consistent JSON error responses
- **Development**: Vite integration for HMR and development tooling with custom logging middleware

### Data Storage Solutions
Currently implements an **in-memory storage system** with a well-defined interface that can be easily swapped for database implementations:
- **Schema Definition**: Drizzle ORM schemas define the data structure for organizations, ensembles, and concerts
- **Database Ready**: Drizzle configuration points to PostgreSQL with Neon database provider
- **Type Safety**: Full TypeScript integration between schema definitions and application code
- **Relationships**: Proper foreign key relationships between organizations, ensembles, and concerts

### Design System
- **Component Variants**: Class Variance Authority (CVA) for systematic component styling
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Accessibility**: Radix UI primitives ensure WCAG compliance across interactive elements
- **Visual Hierarchy**: Custom color palette optimized for the Kansas City choral community theme

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for building design systems
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library providing consistent iconography
- **shadcn/ui**: Pre-built component library built on Radix UI with Tailwind CSS

### Data Management
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect for database operations
- **TanStack Query**: Server state management with caching, synchronization, and background updates
- **Zod**: Runtime type validation integrated with Drizzle schemas

### Development Tools
- **Vite**: Build tool providing fast development server and optimized production builds
- **TypeScript**: Static type checking across the entire application
- **Replit Integration**: Development environment optimizations with runtime error handling

### Database and Hosting
- **Neon Database**: Serverless PostgreSQL database platform configured via DATABASE_URL
- **Node.js**: Runtime environment with ES modules support

### Form and Interaction Libraries
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration layer between React Hook Form and validation libraries
- **Date-fns**: Date manipulation and formatting utilities

The application is designed to be easily deployable with environment-based configuration and follows modern web development best practices for performance, accessibility, and maintainability.