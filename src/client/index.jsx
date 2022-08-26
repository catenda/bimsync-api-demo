/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'mobx-react/batchingForReactDom';
import './index.module.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
