import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Mindmap from '../pages/Mindmap';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mindmap',
    element: <Mindmap />,
  },
];

export default routes;
