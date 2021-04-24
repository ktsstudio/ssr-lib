import loadable from "@loadable/component";

export const MainPage = loadable(() => import("./Main"));
export const AboutPage = loadable(() => import("./About"));
export const AboutIdPage = loadable(() => import("./AboutId"));

export const routes = [
  {
    path: "/about",
    component: AboutPage,
    routes: [
      {
        path: "/about/:id",
        component: AboutIdPage,
      },
    ],
  },
  {
    path: "/",
    exact: true,
    component: MainPage,
  },
];
