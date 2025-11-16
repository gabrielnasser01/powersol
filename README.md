# PowerSOL Backend

PowerSOL provides a transparent Solana-based lottery platform with NFT tickets, VRF powered draws, tiered affiliates, missions, and a full API surface.

## Structure

- `programs/powersol-core`: Anchor program for configuration, ticket sales, revenue splits, draw finalization, and CPI prize claims.
- `programs/powersol-claim`: Anchor program that wraps the CPI claim flow and produces idempotent claim receipts.
- `src`: TypeScript API built with Express, Prisma, BullMQ, and Anchor helpers.
- `scripts`: Operational scripts (init, buy, draw, claim, affiliate withdraw).
- `docs`: OpenAPI specification and future runbooks.

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- Rust + Anchor CLI (1.17+, Anchor 0.29)
- PostgreSQL 14+
- Redis (for queues)

### Setup

```bash
cp .env.example .env
# Edit keys (RPC_URL, DATABASE_URL, wallet secrets, etc.)
yarn install
yarn prisma:generate
yarn prisma:migrate
```

Run the API locally:

```bash
yarn dev
# API available at http://localhost:4000/api
```

Start background schedulers and queue workers in separate shells:

```bash
yarn jobs
yarn queue
```

### Anchor

Build and test the on-chain programs:

```bash
anchor build
anchor test
```

Each program exposes IDLs used by the TypeScript client utilities (`src/lib/solana.ts`).

## Scripts

- `yarn ts-node scripts/init.ts` – initialise global PDAs (placeholder).
- `yarn ts-node scripts/buy.ts --wallet <wallet> --lottery TRI_DAILY --quantity 2` – simulate a ticket purchase.
- `yarn ts-node scripts/draw.ts --lottery JACKPOT_2` – trigger Switchboard VRF request handling.
- `yarn ts-node scripts/claim.ts --ticket <id> --wallet <wallet>` – placeholder claim workflow.
- `yarn ts-node scripts/aff-withdraw.ts --affiliate <id> --amount 1.5` – queue an affiliate withdrawal.

## Testing

- `yarn test` – runs Jest API tests.
- Anchor unit tests exist in each program (`#[cfg(test)]`).

## Deployment Notes

- Configure environment secrets: RPC endpoints, wallet keypairs (`DEV_WALLET_SECRET`), Switchboard VRF queue, and affiliate treasury wallet.
- Cron expressions are defined in `src/jobs/drawScheduler.ts` (UTC).
- Queue workers should run close to the RPC endpoint to minimise latency before calling CPI claims.
- OpenAPI spec lives in `docs/openapi.yaml` for quick import into Postman.

## Next Steps

- Implement full Anchor CPI calls within scripts.
- Integrate VRF oracle callback listeners.
- Expand Jest coverage for affiliate flows and transparency endpoints.
- Harden authentication (signatures, JWT) before production.
