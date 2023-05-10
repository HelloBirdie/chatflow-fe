import React from 'react';

import { useRoutes } from 'react-router-dom';
import routes from './routers';

function App() {
  const element = useRoutes(routes);
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {element}
    </div>
  );
}

export default App;
