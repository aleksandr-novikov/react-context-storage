import React from 'react';
import ReactDom from 'react-dom';
import { hotAppWithStorageProvider } from './app';

const node = document.getElementById('app');

ReactDom.render(
  React.createElement(hotAppWithStorageProvider, {}),
  node as Element
);
