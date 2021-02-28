import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import { SnackbarProvider } from "notistack";

render(
    <Provider store={store}>
        <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "right" }} maxSnack={3} >
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);