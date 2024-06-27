// Step 1:  Import the Dependencies
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

// Step 2:  Define your Query
export const GQL_QUERY = `query info($address: Bytes) {domains(where: {creator: $address}) {id}}`;

// Step 3: Set your Endpoint
const endpoint = 'https://subgraph.arthera.net/subgraphs/name/arthera/zns';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
// Step 5: Execute the Query
  let response = await client.query({ query: gql(GQL_QUERY), variables: { address: '0x4FB7cD1cf8CFee6B9440f5ccDD2Cb43f73d5Aaa3' } });
// Step 6:  Print the Result
  const data = response?.data;
  const value = function (data) { if (data?.domains?.length > 0) { return 1; } return 0; }(data);
  console.log(value);
}

executeQuery();