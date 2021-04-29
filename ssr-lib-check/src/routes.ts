import loadable from "@loadable/component";
import { RouteConfig } from "react-router-config";

export const MainPage = loadable(() => import("./Main"));
export const AboutPage = loadable(() => import("./About"));
export const AboutIdPage = loadable(() => import("./AboutId"));

export const routes: RouteConfig[] = [
  {
    path: "/about",
    component: AboutPage as any,
    routes: [
      {
        path: "/about/:id",
        component: AboutIdPage as any,
      },
    ],
  },
  {
    path: "/",
    exact: true,
    component: MainPage,
  },
];
