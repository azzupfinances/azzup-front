# API Client

Technical HTTP infrastructure lives in `src/lib/api/`. It has no feature knowledge.

```text
src/lib/api/
├── api-client.ts   # configured client: base URL, headers, auth, error handling
└── api-error.ts    # typed error class
```

## Rules

- One configured client for the app's backend. Add another only for a genuinely different backend.
- Base URLs and keys come from `src/lib/config/` (reading `process.env`), never hardcoded.
- Public env vars use `NEXT_PUBLIC_`; secrets never reach Client Components.
- The client handles: base URL, JSON serialization, auth headers, typed responses, error normalization.
- Throw a typed `ApiError` (status, message, optional details) on non-2xx responses.
- Prefer native `fetch` unless the project already uses another HTTP library.
- Feature endpoints, payloads and mappings belong in feature services, not here.

## Auth

- Token/session reading lives in `src/lib/auth/`; the API client consumes it.
- Do not read cookies or storage directly inside features.

## Server vs. Client

- Server Components may call feature services directly (no React Query needed).
- Client Components fetch through React Query hooks. See `data/react-query.md`.
- Use Next.js `fetch` caching options (`cache`, `next.revalidate`, `next.tags`) deliberately in server calls.

## Third-Party SDKs

Wrap external SDKs in `src/lib/integrations/` or `src/lib/sdk/` and expose a small typed adapter.
