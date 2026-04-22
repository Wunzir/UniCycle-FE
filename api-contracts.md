# API Contract

## Base path
`/api`

## Endpoints

### GET /api/system/health
Returns service health.

### GET /api/listings
Query params:
- `search`
- `category`
- `sort` (`recent`, `price_asc`, `price_desc`)

### GET /api/listings/{id}
Returns one listing.

### GET /api/favorites
Returns saved listings for current user.

### POST /api/favorites/{listingId}
Adds favorite.

### DELETE /api/favorites/{listingId}
Removes favorite.