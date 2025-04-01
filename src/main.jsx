import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { addInterceptors } from "./axiosApi.js";
import { ruRU } from '@mui/material/locale';
import { createTheme, ThemeProvider } from "@mui/material";

addInterceptors(store);

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      background: {
        default: '#000000'
      }
    },
  },
  ruRU,
);

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
