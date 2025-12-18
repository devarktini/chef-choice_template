# Environment Configuration

## Setup Instructions

Create a `.env.local` file in the root directory with the following content:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

### Configuration Details

- **NEXT_PUBLIC_API_BASE_URL**: The base URL for your backend API
  - Development: `http://127.0.0.1:8000`
  - Production: Update this to your production API URL

### Important Notes

1. The `.env.local` file is gitignored and should never be committed to version control
2. All environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
3. After creating or modifying the `.env.local` file, restart the development server

## Quick Setup

Run this command to create the `.env.local` file:

```bash
echo "NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000" > .env.local
```
