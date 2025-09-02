"use client";
import { useEffect } from "react";
import { useScrollContext } from "./context/ScrollContext";
import { resetActiveMenuClasses } from "./updateMenuUtils";
import { menuItems } from "@assets/data/menuItems";
import {
    addNewUrl,
    updateSectionClasses,
    scrollInView,
    currentSectionId,
    handleScrollClick,
} from "./fnScrollUtils";
import type { MenuItem, SubItem } from "@assets/data/interfaces/menu";

/**
 * Détermine l'offset de défilement à appliquer.
 * Priorité : MenuItem > SubItem > 0.
 */
export function resolveScrollOffset(
    menuItem?: Pick<MenuItem, "scrollOffset">,
    subItem?: Pick<SubItem, "scrollOffset">
): number {
    if (typeof menuItem?.scrollOffset === "number") {
        return menuItem.scrollOffset;
    }
    if (typeof subItem?.scrollOffset === "number") {
        return subItem.scrollOffset;
    }
    return 0;
}
/*-------------------------------------------------------*/
export const useInitialScroll = (pathname: string | null) => {
    useEffect(() => {
        if (window.location.hash) {
            window.scrollTo({ top: 0 });
            const hashWithSharp = window.location.hash;
            const hash = hashWithSharp.substring(1);
            const allItems = [
                ...menuItems.mainLink,
                ...(menuItems.reservation ?? []),
                ...(menuItems.search ?? []),
                ...(menuItems.connection ?? []),
            ];
            const menuItem = allItems.find((item) => item.path === pathname);
            const subItem = menuItem?.subItems?.find((s) => s.AnchorId === hashWithSharp);
            const offset = resolveScrollOffset(menuItem, subItem);
            handleScrollClick(hash, offset);
        }
        resetActiveMenuClasses();
    }, [pathname]);
};

/*-------------------------------------------------------*/

export const useScrollAnchors = (sections: { id: string }[]) => {
    const { setActiveSection } = useScrollContext();
    useEffect(() => {
        const handleScroll = () => {
            scrollInView(sections);
            addNewUrl(currentSectionId);
            updateSectionClasses(sections, setActiveSection);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections, setActiveSection]);
};
