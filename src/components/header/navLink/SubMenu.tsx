"use client";

import React from "react";
import { MenuItem } from "@assets/data/menuItems";
import { useNavigation } from "../../../utils/context/NavigationContext";
import { toAction } from "../../../menu/actions/adapter";
import { dispatch } from "../../../menu/actions/dispatch";
import { externalActions } from "../../../menu/actions/externalActions";

interface SubMenuProps {
    menuItem: MenuItem;
    isOpen: boolean;
    onSubItemClick: (path: string, scrollOffset?: number) => void;
    triggerRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

const SubMenu: React.FC<SubMenuProps> = ({ menuItem, isOpen, onSubItemClick, triggerRef }) => {
    const { setOpenSubMenu } = useNavigation();
    const useActions = process.env.NEXT_PUBLIC_MENU_ACTIONS_V2 === "true";

    const closeSubMenu = () => {
        setOpenSubMenu(null);
        if (triggerRef?.current) {
            triggerRef.current.focus();
        }
    };

    const handleAction = (
        subItem: MenuItem,
        fullPath: string,
        subItemScrollOffset: number | undefined,
        e: React.MouseEvent | React.KeyboardEvent
    ) => {
        e.preventDefault();
        if (useActions) {
            const actionItem = { ...subItem, path: menuItem.path } as MenuItem;
            const action = toAction(actionItem, externalActions);
            dispatch(action, externalActions);
        } else {
            const offset = menuItem.scrollOffset ?? subItemScrollOffset;
            onSubItemClick(fullPath, offset);
        }
        closeSubMenu();
    };

    const handleKeyDown = (
        subItem: MenuItem,
        fullPath: string,
        subItemScrollOffset: number | undefined,
        e: React.KeyboardEvent<HTMLElement>
    ) => {
        if (["Enter", " "].includes(e.key)) {
            handleAction(subItem, fullPath, subItemScrollOffset, e);
        } else if (e.key === "Escape") {
            e.preventDefault();
            closeSubMenu();
        }
    };

    const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Escape") {
            e.preventDefault();
            closeSubMenu();
        }
    };

    if (!menuItem.subItems || menuItem.subItems.length === 0) return null;

    return (
        <div className={`submenu ${isOpen ? "open" : ""}`}>
            <div
                className="submenu_group"
                role="menu"
                id={`sub-${menuItem.id}`}
                onKeyDown={handleGroupKeyDown}
            >
                {menuItem.subItems.map((subItem) => {
                    const fullPath = `${menuItem.path ?? ""}${subItem.AnchorId ?? ""}`;
                    const action = useActions
                        ? toAction({ ...subItem, path: menuItem.path } as MenuItem, externalActions)
                        : null;
                    const href = useActions && action?.kind === "href" ? action.href : fullPath;
                    return (
                        <a
                            key={subItem.id}
                            aria-label={`Section ${subItem.title}`}
                            href={href}
                            className={`nav-link ${subItem.class || null}`}
                            tabIndex={0}
                            onClick={(e) =>
                                handleAction(subItem as MenuItem, fullPath, subItem.scrollOffset, e)
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(
                                    subItem as MenuItem,
                                    fullPath,
                                    subItem.scrollOffset,
                                    e
                                )
                            }
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
