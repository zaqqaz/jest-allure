import * as Allure from "allure-js-commons";

const root: Window = typeof window === "undefined" ? (global as any as Window) : window;
(root as any).allure = new Allure();
