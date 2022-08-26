/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store/store';
import { App } from './App';
import 'mobx-react/batchingForReactDom';
import './index.module.scss';

const store = new Store();
window.store = store;

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
