# Deployment Guide for Erasan React App

## Quick Start

### 1. Build the Project
```bash
cd my-react-app
npm run build
```

This creates a `dist/` folder with all production files.

---

## Hostinger Deployment

### Steps:
1. Log in to your Hostinger account
2. Go to **File Manager** → **public_html**
3. Delete all existing files (backup if needed)
4. Upload all contents from `dist/` folder
5. Copy the `.htaccess` from `deployment/hostinger/` to `public_html/`
6. Enable SSL in Hostinger dashboard
7. Uncomment HTTPS redirect lines in `.htaccess`

### File Structure on Hostinger:
```
public_html/
├── .htaccess          ← Copy from deployment/hostinger/
├── index.html
├── vite.svg
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### Enable HTTPS:
After SSL is active, edit `.htaccess` and uncomment:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## IONOS Deployment

### Steps:
1. Log in to your IONOS account
2. Go to **Hosting** → **Webspace**
3. Open **WebFTP** or use FTP client
4. Navigate to your domain's root folder
5. Upload all contents from `dist/` folder
6. Copy the `.htaccess` from `deployment/ionos/` to root
7. Activate SSL certificate in IONOS dashboard
8. Uncomment HTTPS redirect lines in `.htaccess`

### File Structure on IONOS:
```
/
├── .htaccess          ← Copy from deployment/ionos/
├── index.html
├── vite.svg
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### Enable HTTPS:
After SSL is active, edit `.htaccess` and uncomment:
```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Using Default .htaccess

The file at `public/.htaccess` is a universal version that works on both hosting providers. It's automatically included when you run `npm run build`.

---

## Troubleshooting

### Page not found on refresh (404 error)
- Make sure `.htaccess` is uploaded
- Check if mod_rewrite is enabled
- Contact hosting support to enable mod_rewrite

### CSS/JS not loading
- Check browser console for errors
- Verify file paths are correct
- Clear browser cache

### Slow loading
- Enable compression in `.htaccess` (already included)
- Check if hosting has caching enabled
- Consider using a CDN

### HTTPS not working
- Verify SSL certificate is active
- Wait 24-48 hours after SSL activation
- Clear browser cache and try incognito mode

---

## Performance Tips

1. **Enable CDN** if available in your hosting
2. **Use WebP images** for better compression
3. **Minimize assets** (already done by Vite)
4. **Enable HTTP/2** (usually automatic with SSL)

---

## Contact

For issues specific to:
- **Hostinger**: support@hostinger.com or live chat
- **IONOS**: support.ionos.com

