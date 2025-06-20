# EigenLayer Restaking API

A backend service that aggregates and exposes EigenLayer restaking data.

## Features

- Get list of restakers with their restaked amount and target validator
- Get list of validators with their statistics
- Get reward information for specific wallet addresses

## API Endpoints

- `GET /restakers` - List of restakers
- `GET /validators` - List of validators
- `GET /rewards/:address` - Reward info for a specific wallet

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB and update the connection string in `.env`
4. Run the server: `npm start`
5. Run the data fetching script: `node scripts/fetchData.js`

## Data Sources

- EigenLayer subgraph (The Graph Protocol)
- On-chain data via direct contract calls (future implementation)

## Assumptions

- The EigenLayer subgraph contains all required data fields
- stETH is the only restaked asset (for simplicity)
- Reward timestamps are available from the subgraph