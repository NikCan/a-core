import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './api';
import { AuthProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="a-core">
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>
);
