import '../styles/globals.css'

import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { createAuthLink } from 'aws-appsync-auth-link';
import { AppSyncConfig } from '../AWS';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Amplify, { Auth } from 'aws-amplify';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2fe1b9',
      },
      secondary: {
        main: '#f7f1f0',
      },
    },
    //.MuiInput-underline:before
    overrides: {
      MuiInput: {
        input: {
          //background: "#fff",
          color: '#f7f1f0',
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid #f7f1f0"
          }
        }
      },
      MuiFormLabel: {
        root: {
          color: '#f7f1f0'
        }
    }
    },
});


function MyApp({ Component, pageProps }) {
  const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
  const region = AppSyncConfig.aws_appsync_region;

  const auth = {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey
  };
  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }), 
    createHttpLink({ uri: url })
  ]);

  const cache_options = {
    typePolicies: {
      Deals: {
        keyFields: ["id", "timestamp"],
      }
    }
  }

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(cache_options)
  });

  Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_vGt3GBNEk',
        userPoolWebClientId: '154l05mui57q0edcpq2hp0v585',
        identityPoolId: 'us-east-1:1a9591ba-f9ca-4649-ba23-a1830b3ecb77',
    }
  });

  // Amplify.configure({
  //   Auth: {
  //       region: process.env.AWS_region,
  //       userPoolId: process.env.AWS_userPoolId,
  //       userPoolWebClientId: process.env.AWS_userPoolWebClientId,
  //       identityPoolId: process.env.AWS_identityPoolId,
  //   }
  // });

  return(
    <ApolloProvider client={client} >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  ) 
}

export default MyApp
