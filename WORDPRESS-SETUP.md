# WordPress Headless CMS Setup Guide

This guide explains how to set up WordPress as a headless CMS for the Erasan React website.

## Overview

The React frontend connects to WordPress via the REST API to fetch:
- **Products** (Custom Post Type)
- **Blog Posts** (Standard Posts)
- **Contact Information** (Page with ACF fields)

> **Note:** The contact form itself stays in React (client-side). WordPress only manages the contact information (email, phone, address, business hours) that is displayed on the page.

## WordPress Installation

### 1. Install WordPress on Hostinger/IONOS

1. Log in to your hosting control panel
2. Use the auto-installer (Softaculous or similar) to install WordPress
3. Complete the WordPress installation wizard
4. Note your WordPress admin URL: `https://your-domain.com/wp-admin`

### 2. Required WordPress Plugins

Install and activate these plugins:

| Plugin | Purpose | Where to Get |
|--------|---------|--------------|
| **Advanced Custom Fields (ACF)** | Add custom fields to products & contact info | WordPress Plugin Directory |
| **ACF to REST API** | Expose ACF fields in REST API | WordPress Plugin Directory |
| **Custom Post Type UI** | Create Products post type | WordPress Plugin Directory |

### 3. Create Products Custom Post Type

Using **Custom Post Type UI** plugin:

1. Go to: CPT UI → Add/Edit Post Types
2. Create new post type with these settings:

```
Post Type Slug: products
Plural Label: Products
Singular Label: Product
Public: true
Show in REST: true (IMPORTANT!)
REST Base: products
Has Archive: true
Supports: title, editor, thumbnail, excerpt, custom-fields
```

3. Create Product Category Taxonomy:

```
Taxonomy Slug: product_category
Plural Label: Product Categories
Singular Label: Product Category
Attach to: Products
Show in REST: true (IMPORTANT!)
REST Base: product_category
```

### 4. Add Custom Fields with ACF

#### Product Details Field Group

Create a Field Group for Products:

1. Go to: ACF → Field Groups → Add New
2. Name: "Product Details"
3. Location: Post Type is equal to Products
4. Add these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `featured` | True/False | Is this a featured product? |
| `specifications` | Repeater | Technical specifications |
| `specifications` → `label` | Text | Specification name |
| `specifications` → `value` | Text | Specification value |
| `features` | Repeater | Key features list |
| `features` → `feature` | Text | Feature description |

#### Contact Information Field Group

Create a Field Group for Contact Information:

1. Go to: ACF → Field Groups → Add New
2. Name: "Contact Information"
3. Location: Page is equal to "Contact Info"
4. Add these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `email` | Email | Company email address |
| `phone` | Text | Company phone number |
| `address` | Textarea | Company address |
| `business_hours` | Text | Business hours (e.g., "Mon - Fri: 8:00 - 18:00") |
| `map_url` | URL | Google Maps embed URL (optional) |
| `secondary_phone` | Text | Secondary phone (optional) |
| `fax` | Text | Fax number (optional) |
| `linkedin_url` | URL | LinkedIn profile URL (optional) |
| `youtube_url` | URL | YouTube channel URL (optional) |
| `twitter_url` | URL | Twitter profile URL (optional) |

### 5. Create Contact Info Page

1. Go to: Pages → Add New
2. Title: "Contact Info"
3. **Important:** Set the slug to `contact-info`
4. Fill in the ACF fields with your contact details
5. Click Publish

This page won't be visible on your WordPress site—it only provides data for the React frontend.

### 6. Enable CORS for API Access

Add to your WordPress `wp-config.php`:

```php
// Enable CORS for headless setup
define('WP_CORS_ENABLED', true);
```

Or add to your theme's `functions.php`:

```php
// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
}, 15);
```

## React Configuration

### Environment Variables

Create a `.env` file in your React project root:

```env
# WordPress API URL (without trailing slash)
VITE_WP_API_URL=https://your-wordpress-site.com
```

### Update API Service (if needed)

The API service is pre-configured in `src/services/wordpress.js`. Update the fallback URL if needed:

```javascript
const WP_CONFIG = {
  baseUrl: import.meta.env.VITE_WP_API_URL || 'https://your-wordpress-site.com',
  // ...
}
```

## Testing the API

### Verify WordPress REST API

Open these URLs in your browser to test:

```
# Posts endpoint
https://your-wordpress-site.com/wp-json/wp/v2/posts

# Products endpoint (after creating custom post type)
https://your-wordpress-site.com/wp-json/wp/v2/products

# Categories
https://your-wordpress-site.com/wp-json/wp/v2/categories

# Product categories
https://your-wordpress-site.com/wp-json/wp/v2/product_category

# Contact Info page (to verify ACF fields)
https://your-wordpress-site.com/wp-json/wp/v2/pages?slug=contact-info
```

### Test from React App

The hooks are ready to use:

```javascript
import { usePosts, useProducts, useContactInfo } from './hooks/useWordPress'

// In your component
const { posts, loading, error } = usePosts()
const { products } = useProducts()
const { contactInfo } = useContactInfo()
```

## Content Management Workflow

### For Non-Technical Users

1. **Log in** to WordPress admin: `https://your-domain.com/wp-admin`

2. **Add Products:**
   - Go to: Products → Add New
   - Add title, description, featured image
   - Fill in custom fields (specifications, features)
   - Assign to Product Category
   - Click Publish

3. **Write Blog Posts:**
   - Go to: Posts → Add New
   - Use the block editor for rich content
   - Add featured image
   - Assign categories and tags
   - Click Publish

4. **Update Contact Information:**
   - Go to: Pages → Contact Info
   - Edit the ACF fields (email, phone, address, hours)
   - Click Update
   - Changes appear immediately on the website

## How Contact Form Works

The contact form on the website:
- Is handled entirely by React (client-side)
- Validates input in the browser
- Currently simulates submission (shows success message)

**To make the form actually send emails**, you have two options:

### Option A: Email Service (Recommended)

Use a service like:
- [EmailJS](https://www.emailjs.com/) - Free tier available
- [Formspree](https://formspree.io/) - Free tier available
- [SendGrid](https://sendgrid.com/) - Free tier available

### Option B: Your Own Backend

Create a simple API endpoint that:
1. Receives form data
2. Validates it
3. Sends email via SMTP or a mail service

Example with Node.js/Express and Nodemailer is straightforward to implement.

## Security Recommendations

1. **Keep WordPress Updated**
   - Enable auto-updates for minor versions
   - Regularly check for plugin updates

2. **Use Strong Passwords**
   - Enforce strong passwords for all users
   - Consider two-factor authentication

3. **Regular Backups**
   - Use hosting backup features
   - Consider UpdraftPlus plugin

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:
1. Verify CORS is enabled in WordPress (see Step 6)
2. Check that your React app URL is allowed
3. Try adding your specific domain instead of `*`

### Products Not Showing

1. Verify "Show in REST" is enabled for the custom post type
2. Check the REST base matches the API calls (`products`)
3. Ensure products are published (not drafts)

### ACF Fields Not in API

1. Verify "ACF to REST API" plugin is active
2. Check field group is assigned to correct post type/page
3. ACF fields appear under `acf` key in the response

### Contact Info Not Updating

1. Verify the page slug is exactly `contact-info`
2. Check ACF fields are published with the page
3. Clear any caching plugins in WordPress
4. Hard refresh the React app (Ctrl+Shift+R)

## API Reference

### Available Hooks

```javascript
// Blog posts with pagination
usePosts({ page, perPage, search, category })

// Single post by slug
usePost(slug)

// Products with pagination
useProducts({ page, perPage, category })

// Single product by slug
useProduct(slug)

// Categories
useCategories(type) // 'posts' or 'products'

// Recent posts
useRecentPosts(count)

// Featured products
useFeaturedProducts(count)

// Contact information from WordPress
useContactInfo()
```

### Helper Functions

```javascript
import { wpHelpers } from './hooks/useWordPress'

// Get featured image URL
wpHelpers.getFeaturedImage(post, 'large')

// Get author info
wpHelpers.getAuthor(post)

// Get categories
wpHelpers.getCategories(post)

// Get tags
wpHelpers.getTags(post)

// Format date
wpHelpers.formatDate(date, 'en-US')

// Get excerpt from content
wpHelpers.getExcerpt(content, 150)

// Get ACF fields
wpHelpers.getAcfFields(post)
```

---

Need help? Contact your web developer or refer to the official documentation:
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
