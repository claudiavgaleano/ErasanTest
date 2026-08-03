# Project scripts

Utility scripts live in `scripts/`. All commands below are run from the **`my-react-app`** directory (where `package.json` is located).

```bash
cd E+Daniel/my-react-app
node scripts/<script-name>.mjs
```

Scripts use native ES modules (`"type": "module"` in `package.json`). No extra install step is required beyond the normal `npm install`.

---

## Overview

| Script | Type | Purpose |
|--------|------|---------|
| `extract-erasan-content.mjs` | Runnable | Fetch pages/posts from erasan.es WordPress API |
| `build-product-catalog.mjs` | Runnable | Generate `products.js`, `categories.js`, and base i18n catalog |
| `sync-coil-winding-rich-i18n.mjs` | Runnable | Populate rich-layout fields for coil winding machines (ES) |
| `sync-accessory-rich-i18n.mjs` | Runnable | Populate rich-layout fields for TH3 tensioners (ES + EN) |
| `sync-product-i18n.mjs` | Runnable | Regenerate English product entries from Spanish (simple) |
| `sync-en-from-es.mjs` | Runnable | Full Spanish → English locale sync (recommended) |
| `write-en-reference.mjs` | Runnable | Snapshot committed `en.json` as translation reference |
| `download-product-images.mjs` | Runnable | Download product images from erasan.es |
| `sync-product-gallery-i18n.mjs` | Runnable | Add second gallery captions + highlight image index |
| `audit-product-images.mjs` | Runnable | Report products missing a second gallery image |
| `extract-specifications-from-pdf.mjs` | Runnable | Extract specs from `FichaTecnica/*.pdf` into product data |
| `specification-labels.mjs` | Module | Spec label → icon key mapping used by PDF extractor |
| `move-brand-features-to-hero-intro.mjs` | Runnable | One-off migration: `brandFeatures.items` → `heroIntro` |
| `product-en-translator.mjs` | Module | Phrase-based ES → EN translation helpers |
| `product-item-en-translator.mjs` | Module | Rich product field translation (used by `sync-en-from-es`) |
| `es-en-overrides.json` | Data | Manual translation overrides |
| `en-reference.json` | Data | Reference English copy (from git HEAD) |

---

## Recommended workflows

### Initial content import (from erasan.es)

Run in this order when bootstrapping or refreshing content from the live site:

```bash
# 1. Fetch WordPress content → src/data/erasan-content.json
node scripts/extract-erasan-content.mjs

# 2. Build products, categories, and base productCatalog in en.json / es.json
node scripts/build-product-catalog.mjs

# 3. Enrich coil winding products with rich-layout structure (Spanish)
node scripts/sync-coil-winding-rich-i18n.mjs

# 4. Enrich TH3 tensionador accessories (Spanish + English)
node scripts/sync-accessory-rich-i18n.mjs

# 5. Download product images and regenerate productGalleryImages.js
node scripts/download-product-images.mjs

# 6. Add second gallery captions in i18n where two images exist
node scripts/sync-product-gallery-i18n.mjs
```

**Requires network:** `extract-erasan-content.mjs`, `download-product-images.mjs`.

### After editing Spanish copy (`es.json`)

Spanish is the source of truth for product content. To refresh English:

```bash
# Optional: update en-reference.json from the last committed en.json
node scripts/write-en-reference.mjs

# Full sync — preserves good existing EN strings via en-reference.json
node scripts/sync-en-from-es.mjs
```

For a lighter product-only sync (without UI strings):

```bash
node scripts/sync-product-i18n.mjs
```

### Image maintenance

```bash
# Re-download missing images and rebuild the gallery registry
node scripts/download-product-images.mjs

# Ensure i18n has two gallery captions per product with two assets
node scripts/sync-product-gallery-i18n.mjs

# List products still missing a second image or caption
node scripts/audit-product-images.mjs
```

### After adding or updating specification PDFs

Place PDF files in `src/assets/FichaTecnica/` using the naming convention below, then run:

```bash
npm run extract-specs
# or: node scripts/extract-specifications-from-pdf.mjs
```

---

## Runnable scripts

### `extract-erasan-content.mjs`

**What it does**

- Calls the WordPress REST API on `https://erasan.es`
- Downloads all pages and blog posts
- Strips HTML, removes nav/footer noise, and groups pages by section (coil winding, accessories, retrofit, etc.)
- Writes **`src/data/erasan-content.json`**

**When to use**

- First-time project setup
- When the client updates copy on the live WordPress site and you need a fresh extract

**Output**

```
src/data/erasan-content.json
```

**Example**

```bash
node scripts/extract-erasan-content.mjs
# Wrote .../src/data/erasan-content.json
# Pages: 42, Posts: 12
```

---

### `build-product-catalog.mjs`

**What it does**

- Reads `src/data/erasan-content.json`
- Generates:
  - **`src/data/products.js`** — product records (`slug`, `section`, `categorySlug`, `i18nKey`, `acf.features`)
  - **`src/data/categories.js`** — coil winding and accessory category definitions
  - **`src/i18n/locales/es.json`** → `productCatalog` section (Spanish)
  - **`src/i18n/locales/en.json`** → `productCatalog` section (English, via `product-en-translator.mjs`)

**When to use**

- After running `extract-erasan-content.mjs`
- When adding/removing products at the catalog level

**Warning**

Overwrites `productCatalog` in both locale files and replaces `products.js` / `categories.js`. Commit or back up manual edits before running.

**Example**

```bash
node scripts/build-product-catalog.mjs
# Built 34 products
# Coil winding categories: 3
# Accessory categories: 5
```

---

### `sync-coil-winding-rich-i18n.mjs`

**What it does**

- Parses structured content from `erasan-content.json` for coil winding machines
- Writes rich-layout fields into **`es.json`** only:
  - `heroSubtitle`, `heroIntro`, `gallery`, `highlight`, `benefitCards`, `brandFeatures`
- Maps cabezal bobinador slugs to their i18n keys (e.g. `bobinadora-erasan-e1200-c` → `cabezal-bobinador-erasan-e1200-c`)
- Preserves manually edited strip-foil fields
- Removes stale duplicate i18n keys for cabezal products

**When to use**

- After `build-product-catalog.mjs` when you need rich product detail pages for coil winders
- After re-extracting content from erasan.es

**Example**

```bash
node scripts/sync-coil-winding-rich-i18n.mjs
# Updated 18 coil winding products in es.json:
#   - bobinadora-erasan-e300
#   ...
```

---

### `sync-accessory-rich-i18n.mjs`

**What it does**

- Builds rich accessory layouts for **TH3 wire tensioners** (`tensionador-de-hilo-th3*`)
- Updates both **`es.json`** and **`en.json`** with:
  - `heroSubtitle`, `characteristics`, `brandFeatures`, `productAccessories`, `tagline`
- Uses curated copy for TH3 variants (standalone, IS, D, etc.)

**When to use**

- After catalog build or content extract, for TH3 tensionador pages

**Example**

```bash
node scripts/sync-accessory-rich-i18n.mjs
# Updated TH3 tensionador accessory layouts in es.json and en.json
```

---

### `sync-product-i18n.mjs`

**What it does**

- Reads every `i18nKey` from `src/data/products.js`
- For each product, replaces the English entry in **`en.json`** with a translation of the matching Spanish entry in **`es.json`**
- Also translates category descriptions and retrofit/specialProjects blurbs

**When to use**

- Quick EN refresh after ES product copy changes
- Does **not** sync non-catalog UI strings (nav, home, etc.)

**Example**

```bash
node scripts/sync-product-i18n.mjs
# Synced English product catalog for 34 products
```

---

### `sync-en-from-es.mjs`

**What it does**

- Full **Spanish → English** sync for the entire `es.json` structure
- Uses **`scripts/en-reference.json`** to preserve already-good English strings
- Uses **`product-item-en-translator.mjs`** for rich product fields (hero, gallery, specs, etc.)
- Applies UI string overrides (nav labels, hero titles, etc.)
- Writes **`src/i18n/locales/en.json`**

**When to use**

- Preferred method after editing `es.json`
- Run `write-en-reference.mjs` first if you want to lock in the current committed EN copy as the reference

**Example**

```bash
node scripts/write-en-reference.mjs   # optional
node scripts/sync-en-from-es.mjs
# Translated 34 products
# Saved .../src/i18n/locales/en.json
```

---

### `write-en-reference.mjs`

**What it does**

- Runs `git show HEAD:src/i18n/locales/en.json`
- Saves the result to **`scripts/en-reference.json`**

**When to use**

- Before `sync-en-from-es.mjs`, to tell the sync script which existing English strings to keep
- Requires a git repository with at least one commit containing `en.json`

**Example**

```bash
node scripts/write-en-reference.mjs
```

---

### `download-product-images.mjs`

**What it does**

- Iterates all products in `src/data/products.js`
- For each product, fetches the live erasan.es product page and downloads up to **2 images**
- Saves images under `src/assets/` (organized by section/category folder)
- Regenerates **`src/data/productGalleryImages.js`** with import paths and the `PRODUCT_GALLERY_IMAGES` map

**When to use**

- Initial asset download
- When adding new products to the catalog
- When gallery images are missing locally

**Notes**

- Skips download if the file already exists on disk
- Filters out logos, icons, partner logos, PDFs, etc.
- Requires network access to erasan.es

**Example**

```bash
node scripts/download-product-images.mjs
# OK: 32
# Failed: 2
```

---

### `sync-product-gallery-i18n.mjs`

**What it does**

- For each product in `products.js` that has **≥ 2 images** in `productGalleryImages.js`:
  - Ensures `gallery` in **`en.json`** and **`es.json`** has two caption entries
  - Adds a detail caption (`" — detail"` / `" — detalle"`) for the second image if missing
  - Sets `highlight.imageIndex` to `1` (secondary image used in highlight section)
- Warns about products with fewer than two image assets

**When to use**

- After `download-product-images.mjs`
- After adding secondary images manually

**Example**

```bash
node scripts/sync-product-gallery-i18n.mjs
# src/i18n/locales/en.json: updated 28 product entries
# src/i18n/locales/es.json: updated 28 product entries
# Missing secondary image asset: kits-retrofit (1 images)
```

---

### `audit-product-images.mjs`

**What it does**

- Read-only check: compares image asset count vs i18n gallery length
- Prints products where `assets < 2` or `i18nGallery < 2`

**When to use**

- QA before deploy
- After bulk image or i18n changes

**Example**

```bash
node scripts/audit-product-images.mjs
# bobinadora-erasan-e300: assets=2, i18nGallery=0, highlightIndex=undefined
```

---

### `extract-specifications-from-pdf.mjs`

**What it does**

- Reads every `.pdf` in **`src/assets/FichaTecnica/`**
- Extracts the **ESPECIFICACIONES TÉCNICAS** grid from the spec sheet (last page of each PDF)
- Maps each file to a product slug and assigns the correct **icon keys** (`cableRounded`, `heightRounded`, etc.)
- Regenerates:
  - **`src/data/productSpecifications.js`** — used by `SpecificationsSection` via `getProductSpecifications()`
  - **`src/data/productSpecPdfs.js`** — download button PDF URLs
  - **`specifications`** arrays in **`es.json`** and **`en.json`** for matching products

**PDF filename → product slug**

| Filename pattern | Example | Product slug |
|------------------|---------|--------------|
| `BOBINADORA-{MODEL}.pdf` | `BOBINADORA-E300.pdf` | `bobinadora-erasan-e300` |
| `BOBINADORA-{MODEL}-{VARIANT}.pdf` | `BOBINADORA-E900-SGB.pdf` | `bobinadora-erasan-e900-sgb` |
| `BOBINADORA-E{NUM}{LETTER}-{VARIANT}.pdf` | `BOBINADORA-E1200C-SGB.pdf` | `cabezal-bobinador-erasan-e1200-c-sgb` |
| Legacy `ERASAN-FICHA-TECNICA-*.pdf` | `ERASAN-FICHA-TECNICA-E300.pdf` | `bobinadora-erasan-e300` |

**When to use**

- Client sends updated ficha técnica PDFs
- Adding specifications for a new machine that has a PDF in `FichaTecnica/`

**Requirements**

- Product must exist in `src/data/products.js` (matching slug)
- `pdf-parse` dev dependency (already in `package.json`)

**Example**

```bash
npm run extract-specs
# Extracted specifications for 8 products
#   ✓ BOBINADORA-E300.pdf → bobinadora-erasan-e300 (16 specs)
#   ✓ ERASAN-FICHA-TECNICA-E1200-SGB.pdf → bobinadora-erasan-e1200-sgb (16 specs)
```

**Notes**

- Icon keys match `SpecificationsSection.jsx` (e.g. `heightRounded` is rotated 90° in the UI)
- Speed range tables are extracted as a summary string when present
- Review `git diff` on generated files before committing — OCR/layout quirks in some PDFs may need manual fixes in the source PDF or in `specification-labels.mjs`

---

### `move-brand-features-to-hero-intro.mjs`

**What it does**

- One-off migration for all products in **`en.json`** and **`es.json`**
- Moves `brandFeatures.items[]` → `heroIntro[]`
- Clears `brandFeatures.items`

**When to use**

- Already applied in this project; only re-run if old data is reintroduced

**Example**

```bash
node scripts/move-brand-features-to-hero-intro.mjs
# .../es.json: moved brandFeatures.items to heroIntro for 34 products
```

---

## Support modules and data files

### `product-en-translator.mjs`

Not run directly. Exports translation helpers used by catalog and sync scripts:

| Export | Purpose |
|--------|---------|
| `translateText(text)` | Phrase/regex-based ES → EN |
| `translateTitle(title)` | Product/page title translation |
| `translateFeatures(features)` | Feature list translation |
| `translateSpecifications(specs)` | Spec label/value translation |
| `translateProductItem(item)` | Full product object (classic layout) |
| `translateRichAccessoryEntry(item)` | Accessory rich-layout fields |
| `translateCategoryDescription(desc)` | Category blurb translation |

Uses phrase tables inline and overrides from **`es-en-overrides.json`**.

### `product-item-en-translator.mjs`

Not run directly. Extended translator used by **`sync-en-from-es.mjs`**:

- Handles rich fields: `heroIntro`, `gallery`, `highlight`, `benefitCards`, `characteristics`, `brandFeatures`, `productAccessories`
- Prefers existing good English from `en-reference.json` over re-translating

### `specification-labels.mjs`

Not run directly. Shared config for **`extract-specifications-from-pdf.mjs`**:

- Canonical spec labels (ES/EN) and icon keys
- PDF filename → product slug mapping (`pdfFilenameToSlug()`)
- Extend this file when the client adds new spec types or PDF naming patterns

### `es-en-overrides.json`

Manual ES → EN string map for UI labels and product phrases that automatic translation gets wrong. Edit this file, then re-run `sync-en-from-es.mjs` or `sync-product-i18n.mjs`.

### `en-reference.json`

Snapshot of English copy used as a fallback during `sync-en-from-es.mjs`. Regenerate with `write-en-reference.mjs` after reviewing and committing good EN translations.

---

## npm scripts (package.json)

These are standard app commands, not content tooling:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check |
| `npm run deploy` | Build and publish to GitHub Pages (`gh-pages`) |

Content scripts are **not** wired into `npm run build`; run them manually when updating catalog data.

---

## Files touched by scripts

| File / folder | Modified by |
|---------------|-------------|
| `src/data/erasan-content.json` | `extract-erasan-content.mjs` |
| `src/data/products.js` | `build-product-catalog.mjs` |
| `src/data/categories.js` | `build-product-catalog.mjs` |
| `src/data/productGalleryImages.js` | `download-product-images.mjs` |
| `src/data/productSpecifications.js` | `extract-specifications-from-pdf.mjs` |
| `src/data/productSpecPdfs.js` | `extract-specifications-from-pdf.mjs` |
| `src/assets/FichaTecnica/*.pdf` | *(input — not modified)* |
| `src/assets/**` | `download-product-images.mjs` |
| `src/i18n/locales/es.json` | Most sync/build scripts |
| `src/i18n/locales/en.json` | Most sync/build scripts |
| `scripts/en-reference.json` | `write-en-reference.mjs` |

Always review `git diff` after running destructive scripts (`build-product-catalog.mjs`, `sync-en-from-es.mjs`, `download-product-images.mjs`) before committing.
