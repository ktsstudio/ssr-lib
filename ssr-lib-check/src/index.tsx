import "core-js/stable";
import "regenerator-runtime/runtime";

import { renderApp } from "@kts/ssr-utils";
import * as React from "react";

import App from "./App";

renderApp(App);
