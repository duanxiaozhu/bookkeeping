import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Forth } from "../components/welcome/Forth";
import { Welcome } from "../views/Welcome";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/items/ItemList";
import { ItemCreate } from "../components/items/ItemCreate";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { ComingSoon } from "../shared/ComingSoon";
import { Notify } from "../views/Notify";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: ()=>import('../views/Welcome'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/items") : next();
    },
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        name: "Welcome1",
        components: { main: First, footer: FirstActions },
      },
      {
        path: "2",
        name: "Welcome2",
        components: { main: Second, footer: SecondActions },
      },
      {
        path: "3",
        name: "Welcome3",
        components: { main: Third, footer: ThirdActions },
      },
      {
        path: "4",
        name: "Welcome4",
        components: { main: Forth, footer: ForthActions },
      },
    ],
  },
  {
    path: "/items",
    component:()=> ('../views/ItemPage'),
    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tags",
    component: ()=>('../views/TagPage'),
    children: [
      { path: "create", component: ()=> import('../components/tag/TagCreate') },
      { path: ":id/edit", component: ()=> import('../components/tag/TagEdit') },
    ],
  },
  {
    path: "/sign_in",
    component: ()=> import('../views/SignInPage'),
  },
  {
    path: "/statistics",
    component: ()=> import('../views/StatisticsPage'),
  },
  {
    path: "/export",
    component: ()=> import('../shared/ComingSoon'),
  },
  {
    path: "/notify",
    component: Notify,
  },
];
