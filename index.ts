// Step 1:  Import the Dependencies
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

// Step 2:  Define your Query
export const SWAP_QUERY = `
  query info {
    swaps(first: 1, where: {origin: "0x568ba215891517462E6BEbAdAe41efa03fccbaC9"}) {
      origin
    }
  }
`;

// Step 3: Set your Endpoint
const endpoint = 'https://subgraph-test.arthera.net/subgraphs/name/cryptoalgebra/algebra';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
// Step 5: Execute the Query
  let response = await client.query({ query: gql(SWAP_QUERY) });
// Step 6:  Print the Result
  console.log(response?.data?.swaps?.length)
}

executeQuery();