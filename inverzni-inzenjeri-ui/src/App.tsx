import React from "react";
import "./App.css";
import {Routes} from "./components/Routes/Routes";
import {Provider} from "react-redux";
import store from "./store/store";

export default function App() {
    return (
        <Provider store={store}>
            {/*<StompClientContextProvider>*/}
            <Routes/>
            {/*</StompClientContextProvider>*/}
        </Provider>
    );
}
