import { TSidebarItem, TUserPath } from "@/types";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.path,
        label: item.name,
        icon: role === "admin" ? <FaUser /> : <FaShoppingCart />,
        children: item.children
          ? item.children.map((child) => ({
              key: child.path!,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            }))
          : undefined,
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};


