import { SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink } from "carbon-components-react";
import React from "react";

const SideNavBar = () => {
    <>
        <SideNav aria-label="Side navigation" isRail>
            <SideNavItems>
                <SideNavMenu title="Category title">
                    <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                        Link
                    </SideNavMenuItem>
                    <SideNavMenuItem
                        aria-current="page"
                        href="https://www.carbondesignsystem.com/"> 
                        Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                        Link
                    </SideNavMenuItem>
                </SideNavMenu>
            </SideNavItems>
        </SideNav>
    </>
}

export default SideNavBar;