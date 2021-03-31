import loadable from "@loadable/component";
import axios from "axios";

export const MainPage = loadable(() => import("./Main"));
export const AboutPage = loadable(() => import("./About"));

export const routes = [
  {
    path: "/about",
    component: AboutPage,
    loadData: async () => {
      const { data } = await axios.get(
        "https://api.github.com/users/NapalmDeath"
      );

      return data;
    },
  },
  {
    path: "/",
    component: MainPage,
  },
];
