"use client";

import React from "react";
import { MenuItem } from "@assets/data/menuItems";
import { useNavigation } from "../../../utils/context/NavigationContext";

interface SubMenuProps {
    menuItem: MenuItem;
    isOpen: boolean;
    onSubItemClick: (path: string, scrollOffset?: number) => void;
    triggerRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

const SubMenu: React.FC<SubMenuProps> = ({ menuItem, isOpen, onSubItemClick, triggerRef }) => {
    const { setOpenSubMenu } = useNavigation();

    const closeSubMenu = () => {
        setOpenSubMenu(null);
        if (triggerRef?.current) {
            triggerRef.current.focus();
        }
    };

    const handleSubItemClick = (
        path: string,
        subItemScrollOffset: number | undefined,
        e: React.MouseEvent | React.KeyboardEvent
    ) => {
        e.preventDefault();
        // ✅ priorité au subItem
        const offset = subItemScrollOffset ?? menuItem.scrollOffset;
        onSubItemClick(path, offset);
        closeSubMenu();
    };

    const handleKeyDown = (
        path: string | null,
        subItemScrollOffset: number | undefined,
        e: React.KeyboardEvent<HTMLElement>
    ) => {
        if (["Enter", " "].includes(e.key) && path) {
            handleSubItemClick(path, subItemScrollOffset, e);
        } else if (e.key === "Escape") {
            e.preventDefault(); // Empêcher le comportement par défaut
            closeSubMenu(); // Fermer le menu si Escape est pressé
        }
    };

    if (!menuItem.subItems || menuItem.subItems.length === 0) return null;

    return (
        <div className={`submenu ${isOpen ? "open" : ""}`}>
            <div
                className="submenu_group"
                role="menu"
                id={`sub-${menuItem.id}`}
                onKeyDown={(e) => handleKeyDown(null, undefined, e)}
            >
                {menuItem.subItems.map((subItem) => {
                    // ✅ support d'un path spécifique au sous-item
                    const basePath = subItem.path ?? menuItem.path ?? "";
                    const href = `${basePath}${subItem.AnchorId ?? ""}`;

                    return (
                        <a
                            key={subItem.id}
                            aria-label={`Section ${subItem.title}`}
                            href={href}
                            className={`nav-link ${subItem.class || ""}`}
                            tabIndex={0}
                            onClick={(e) => handleSubItemClick(href, subItem.scrollOffset, e)}
                            onKeyDown={(e) => handleKeyDown(href, subItem.scrollOffset, e)}
                        >
                            {subItem.title}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SubMenu;
