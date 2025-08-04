import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Space from './pages/Space';
import Hub from './pages/Hub';
import RecipesGQ from './pages/RecipesGQ';
import CalendarGQ from './pages/CalendarGQ';
import FaceRecognition from './pages/FaceRecognition';
import CodeTranslator from './pages/CodeTranslator';
import RootLayout from './layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'space',
        element: <Space />
      },
      {
        path: 'hub',
        element: <Hub />
      },
      {
        path: 'recipes-gq',
        element: <RecipesGQ />
      },
      {
        path: 'calendar-gq',
        element: <CalendarGQ />
      },
      {
        path: 'face-recognition',
        element: <FaceRecognition />
      },
      {
        path: 'code-translator',
        element: <CodeTranslator />
      }
    ]
  }
]); 