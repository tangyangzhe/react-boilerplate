import React from 'react';
import ReactDOM from 'react-dom';
import style from './styles/style.scss';

import { Hello } from './components/Hello';

ReactDOM.render(
  <div>
    <Hello compiler="TypeScript" framework="React" />
    <div className={style.bg}></div>
  </div>,
  document.getElementById('example')
);
