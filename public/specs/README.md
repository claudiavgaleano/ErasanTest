# Technical specification PDFs

Custom PDF datasheets for each product go in this folder.

## How to add a new PDF

1. Save the PDF here using the product slug as the filename:
   ```
   public/specs/{product-slug}.pdf
   ```
   Example: `public/specs/bobinadora-erasan-e600.pdf`

2. Register it in `src/data/productSpecPdfs.js`:
   ```js
   export const productSpecPdfs = {
     'bobinadora-erasan-e600': 'bobinadora-erasan-e600.pdf',
   }
   ```

3. The **Download Technical Specifications** button is always visible on product pages. It becomes active once the PDF is registered and the file exists in `public/specs/`.

## Notes

- The filename in `productSpecPdfs.js` can differ from the slug if needed (e.g. localized PDFs).
- PDFs are served from `/ErasanTest/specs/` on GitHub Pages (see `vite.config.js` `base`).
- Until a product is registered, the download button stays visible but disabled on that product page.
