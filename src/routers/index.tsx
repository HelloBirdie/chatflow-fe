import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import Mindmap from '@/pages/Mindmap';
import Login from '@/pages/Login/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mindmap',
    element: <Mindmap />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
