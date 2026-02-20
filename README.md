# .bookmarks

Curated bookmarks for development and learning, built with Jekyll.

## Project structure

- `index.html`: Homepage template (Liquid + includes).
- `_data/bookmarks.yml`: Bookmark categories and links.
- `_includes/bookmark-card.html`: Reusable card partial.
- `_includes/head-custom.html`: Loads custom site stylesheet.
- `_sass/_variables.scss`: Sass design tokens.
- `_sass/_bookmarks.scss`: Sass partial for bookmark page styles.
- `assets/css/main.scss`: Sass entrypoint compiled by Jekyll.
- `_config.yml`: Jekyll and GitHub Pages settings.
- `Gemfile`: Ruby dependencies for local development.

## Local development

1. Install dependencies:
   - `bundle install`
2. Run Jekyll:
   - `bundle exec jekyll serve`
3. Open:
   - `http://127.0.0.1:4000`

## GitHub Pages deployment

1. Open repository `Settings` -> `Pages`.
2. Set `Source` to `Deploy from a branch`.
3. Select branch `main` and folder `/(root)`.
4. Save and wait for deployment.
