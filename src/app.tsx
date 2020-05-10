import { MainPage } from "./pages/main.page";
import React from "react";
import "./main.scss";
import {COUNT_OF_WIDGET_COLUMNS} from "./settings/app-settings";

export function App() {
    return <MainPage columnsCount={COUNT_OF_WIDGET_COLUMNS}/>
}