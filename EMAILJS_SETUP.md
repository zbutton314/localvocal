# EmailJS Setup Guide

This guide will walk you through setting up EmailJS to handle contact form submissions.

## Step 1: Sign Up for EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps for your email provider
5. Give your service a name (e.g., "LocalVocal Contact")
6. **Copy the Service ID** - you'll need this later

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Choose "Blank Template"
4. Set up your template with these variables:

### Template Variables to Use:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address
- `{{subject}}` - Subject line
- `{{message}}` - The message content
- `{{to_email}}` - Your email address (optional)

### Example Template:
```
Subject: New Contact Form Submission - {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from LocalVocal contact form
```

5. Save the template
6. **Copy the Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your dashboard
2. **Copy your Public Key** - you'll need this later

## Step 5: Update Your Configuration

1. Open `client/src/config/emailjs.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // From Step 2
  TEMPLATE_ID: 'your_template_id_here', // From Step 3
  PUBLIC_KEY: 'your_public_key_here', // From Step 4
  TO_EMAIL: 'your-email@example.com' // Your email address
};
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email to confirm you received the message

## Troubleshooting

### Common Issues:

1. **"Service not found" error**
   - Double-check your Service ID
   - Make sure your email service is properly connected

2. **"Template not found" error**
   - Double-check your Template ID
   - Make sure the template is saved and published

3. **"Invalid public key" error**
   - Double-check your Public Key
   - Make sure you're using the public key, not the private key

4. **Email not received**
   - Check your spam folder
   - Verify your email service connection in EmailJS dashboard
   - Check the EmailJS dashboard for any error logs

## Free Tier Limits

- **200 emails per month** (more than enough for your expected volume)
- **2 email services**
- **5 email templates**

## Security Notes

- The Public Key is safe to expose in frontend code
- Never share your Private Key
- Consider using environment variables for production

## Optional: Environment Variables (Production)

For production deployment, you can use environment variables:

1. Create a `.env` file in your project root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_TO_EMAIL=your-email@example.com
```

2. Update `client/src/config/emailjs.ts`:
```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  TO_EMAIL: import.meta.env.VITE_TO_EMAIL,
};
```

## Support

If you encounter issues:
1. Check the [EmailJS documentation](https://www.emailjs.com/docs/)
2. Look at the browser console for error messages
3. Check the EmailJS dashboard for service status
