// Step 1:  Import the Dependencies
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Step 2:  Define your Query
export const BIDS_QUERY = `
  query getBatchAuctionLot($id: ID!) {
    batchAuctionLot(id: $id) {
      bids(first: 1000, where: {status: "claimed"}) {
        bidId
        bidder
        rawAmountIn
        referrer
      }
    }
  }
`;

// Step 3: Set your Endpoint
const endpoint = 'https://api.goldsky.com/api/public/project_cm87g2s71jd5j010598yx65ww/subgraphs/axis-origin-base-sepolia/1.0.6/gn';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
  // Step 5: Execute the Query
  let response = await client.query({ query: gql(BIDS_QUERY), variables: { id: 'base-sepolia-0xba0000c28179ce533233a943d432eddd154e62a3-36' } });
  // Step 6:  Print the Result
  console.log(response?.data?.batchAuctionLot?.bids)
}

executeQuery();