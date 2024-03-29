import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { Platform } from 'react-native';

const host = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000';

export const client = new ApolloClient({
  link: createUploadLink({
    uri: host,
  }) as any,
  cache: new InMemoryCache(),
});
