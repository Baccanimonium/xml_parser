import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'simplebar-react/dist/simplebar.min.css'
import 'react-perfect-scrollbar/dist/css/styles.min.css'
import App from './App';
import { RecoilRoot } from 'recoil'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from "dayjs";
dayjs.extend(customParseFormat)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <App />
    </RecoilRoot>
  </React.StrictMode>
);

