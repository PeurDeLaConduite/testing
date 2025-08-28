"use client";

import React, { useRef } from "react";
import { MenuItem } from "@assets/data/menuItems";
import SubMenu from "./SubMenu";
import RenderLink from "./RenderLink";
import { getShowGroupClass } from "../utils/menuUtils";
import { toAction } from "../../../menu/actions/adapter";
import { dispatch } from "../../../menu/actions/dispatch";
import { externalActions } from "../../../menu/actions/externalActions";
interface NavLinkShowProps {
    menuItem: MenuItem;
    onNavigationClick: (path: string, scrollOffset?: number) => void;
    isOpen: boolean;
    showNavLinks: boolean;
    handleMenuClick: (menuItemId: string) => void;
    onMenuToggle: (menuItemId: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
    openButton: boolean;
    openMainButton: boolean;
    onMouseEnter: () => void;
    onFocus: () => void;
}

const NavLinkShow: React.FC<NavLinkShowProps> = ({
    menuItem,
    onNavigationClick,
    isOpen,
    showNavLinks,
    handleMenuClick,
    onMenuToggle,
    openButton,
    openMainButton,
    onMouseEnter,
    onFocus,
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const mainNav = !openMainButton && showNavLinks && !openButton;
    const useActions = process.env.NEXT_PUBLIC_MENU_ACTIONS_V2 === "true";
    const renderSubMenu = () => {
        return menuItem.subItems && menuItem.subItems.length > 0 ? (
            <SubMenu
                menuItem={menuItem}
                isOpen={isOpen}
                onSubItemClick={onNavigationClick}
                triggerRef={triggerRef}
            />
        ) : null;
    };
    const handleInteraction = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.preventDefault();
        if (useActions) {
            const action = toAction(menuItem, externalActions);
            dispatch(action, externalActions);
            if (action.kind === "toggle") {
                onMenuToggle(menuItem.id, event);
            }
        } else {
            onMenuToggle(menuItem.id, event);
        }
    };

    return openMainButton || mainNav || (openButton && showNavLinks) ? (
        <div
            className={`group_link-submenu ${menuItem.id} ${!openMainButton ? "nav-padding" : ""}`}
        >
            <RenderLink
                menuItem={menuItem}
                onNavigationClick={onNavigationClick}
                showNavLinks={showNavLinks}
                handleMenuClick={handleMenuClick}
            />
            {renderSubMenu()}
        </div>
    ) : (
        <div
            ref={triggerRef}
            className={getShowGroupClass(menuItem.id, showNavLinks)}
            role="button"
            aria-label={`ouvrir le menu ${menuItem.title}`}
            aria-haspopup="menu"
            aria-expanded={menuItem.subItems ? isOpen : undefined}
            aria-controls={menuItem.subItems ? `sub-${menuItem.id}` : undefined}
            tabIndex={0}
            onClick={handleInteraction}
            onKeyDown={(e) => {
                if (["Enter", " "].includes(e.key)) {
                    handleInteraction(e);
                }
            }}
            onMouseEnter={onMouseEnter}
            onFocus={onFocus}
        >
            <RenderLink
                menuItem={menuItem}
                onNavigationClick={onNavigationClick}
                showNavLinks={showNavLinks}
                handleMenuClick={handleMenuClick}
            />
            {renderSubMenu()}
        </div>
    );
};

export default NavLinkShow;
