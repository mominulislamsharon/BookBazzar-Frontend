import { TRoute, TUserPath } from "@/types";

export const routeGenerator = (items: TUserPath[]): TRoute[] => {
  return items.map((item) => {
    const route: TRoute = {
      path: item.path || "",
      element: item.element || null,
    };

    if (item.children) {
      route.children = routeGenerator(item.children);
    }

    return route;
  });
};
