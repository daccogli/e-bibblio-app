import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import RoutesOnHomepage from '../../components/Menu';
const Homepage: React.FC = () => {
    const [routes] = useState
    ([
      { name: 'Books', id: 1, url: 'books'},
      { name: 'Users', id: 2, url: 'users'},
      { name: 'Lendings', id: 3, url: 'lendings'},
      { name: 'Logs', id: 4, url: 'logs'}
    ]);

    return (
      <main>
        <Container>
          {routes.map(({ id, ...outherRoutes }) => (
          <RoutesOnHomepage key={id} {...outherRoutes} />
          ))}
          </Container>
      </main>
    );
};

export default Homepage;
