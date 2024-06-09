import React from 'react';
import { Suspense } from 'react';

import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home , {
  loader as loaderItems,
}  from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Root from './pages/Root';
import Details from './pages/Details';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, 
        element: <Suspense><Home /></Suspense>,
        loader: loaderItems
      },
      {
        path: '/details/:eventId',
        id: 'event-detail',
        element: <Details />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
