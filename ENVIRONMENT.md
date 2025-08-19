# Environment Configuration

This application requires the following environment variables to be set:

## Required Environment Variables

### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string
  - Format: `postgresql://username:password@localhost:5432/database_name`
  - Required for database operations

### Admin Authentication
- `ADMIN_PASSWORD`: Password for admin access
  - Used to protect the data entry forms
  - Should be a strong, unique password
  - Defaults to 'admin123' if not set (change this in production!)

### Session Security
- `SESSION_SECRET`: Secret key for session encryption
  - Used to secure admin sessions
  - Should be a long, random string
  - Defaults to 'your-secret-key-change-in-production' if not set

### Server Configuration
- `PORT`: Port number for the server
  - Defaults to 3000 if not set
- `NODE_ENV`: Environment mode
  - Set to 'production' for production deployment
  - Affects cookie security settings

## Security Recommendations

1. **Change Default Passwords**: Always set `ADMIN_PASSWORD` to a strong, unique password
2. **Use Strong Session Secrets**: Generate a random string for `SESSION_SECRET`
3. **Secure Database**: Use a secure database connection with proper authentication
4. **HTTPS in Production**: Ensure HTTPS is used in production for secure cookie transmission
5. **Environment Isolation**: Use different credentials for development and production

## Example Configuration

```bash
# Development
DATABASE_URL=postgresql://dev_user:dev_pass@localhost:5432/localvocal_dev
ADMIN_PASSWORD=your-secure-dev-password
SESSION_SECRET=dev-session-secret-key
PORT=3000
NODE_ENV=development

# Production
DATABASE_URL=postgresql://prod_user:prod_pass@prod-db:5432/localvocal_prod
ADMIN_PASSWORD=super-secure-production-password
SESSION_SECRET=very-long-random-production-session-secret
PORT=3000
NODE_ENV=production
```
