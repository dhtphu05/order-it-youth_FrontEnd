# Orval code generation

The project ships with [Orval](https://orval.dev/) to keep an up-to-date, typed API client that mirrors your backend's OpenAPI contract.

## 1. Point Orval to your backend

1. Run your backend locally and expose the OpenAPI document (e.g. `http://localhost:4000/openapi-json`).
2. Update `.env` if your ports or routes differ:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ORVAL_OPENAPI_URL=http://localhost:4000/openapi-json
   ```
   These values feed directly into `orval.config.ts`, so the generator always uses the same base URL as your frontend.

## 2. Generate the client

- One-off generation: `pnpm orval`
- Watch for spec changes: `pnpm orval:watch`

The generated files live in `lib/api/generated`:
- `endpoints/**` contains per-tag hooks/functions.
- `models/**` contains the shared schemas/types.

Because `clean` mode is enabled, Orval will remove any stale files inside `lib/api/generated` before each run—avoid editing generated code by hand.

## 3. Using the client

Import the generated functions wherever you need to make requests:

```ts
import { ExampleService } from '@/lib/api/generated/endpoints/example';

const data = await ExampleService.getExample();
```

Every endpoint respects the `NEXT_PUBLIC_API_BASE_URL` value, so when you deploy the backend later you only need to adjust the `.env` file and regenerate (if the contract changed).
