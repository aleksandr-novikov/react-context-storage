import React from 'react';
import ReactDom from 'react-dom';
import { AppWithStorageProvider } from './app';

const node = document.getElementById('app');

ReactDom.render(
  React.createElement(AppWithStorageProvider, {}),
  node as Element
);
