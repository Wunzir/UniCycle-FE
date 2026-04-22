# Database Schema Proposal

## users
- id
- email
- school_email
- full_name
- created_at

## listings
- id
- seller_id
- title
- description
- price
- category
- image_url
- condition
- is_featured
- created_at

## favorites
- id
- user_id
- listing_id
- created_at

## relationships
- one user → many listings
- one user → many favorites
- one listing → many favorites