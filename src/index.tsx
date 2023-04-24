import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './assets/style/reset.scss';
import './assets/style/iconfont.scss';
import './assets/style/common.scss';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router/index'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
