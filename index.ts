// Step 1:  Import the Dependencies
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

// Step 2:  Define your Query
export const NGP_QUERY = `query info($address: Bytes) {   noGasPasses(where: {creator: $address}) {     id   } }`;

// Step 3: Set your Endpoint
const endpoint = 'https://subgraph.arthera.net/subgraphs/name/arthera/subscribers';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
// Step 5: Execute the Query
  let response = await client.query({ query: gql(NGP_QUERY), variables: { address: '0x476E2651BF97dE8a26e4A05a9c8e00A6EFa1390c' } });
// Step 6:  Print the Result
  const data = response?.data;
  const value = function (data) { if (data?.noGasPasses?.length > 0) { return 1; } return 0; }(data);
  console.log(value);
}

executeQuery();