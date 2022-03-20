import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "wouter";
import { Externals } from "../../constant/external";
import { Routes } from "../../constant/routes";

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onMenuClick = (e: any) => {
        e?.preventDefault?.();
        setIsOpen(isOpen => !isOpen);
    }

    return (
        <div className={classNames({ 'is-menu-visible': isOpen })}>
            <header id="header">
                <a href="index.html" className="logo">
                    <strong>Crazy Chat Overlay</strong>&nbsp;<span>by AssistantApps</span>
                </a>
                <img src="https://assistantapps.com/assets/favicon/apple-icon-60x60.png" alt="AssistantApps logo" />
                <nav>
                    <a href="#menu" onClick={onMenuClick}>Menu</a>
                </nav>
            </header>
            <nav id="menu">
                <div className="inner">
                    <ul className="links">
                        <li onClick={onMenuClick}><Link href={Routes.home}>Home</Link></li>
                        <li onClick={onMenuClick}><Link href={Routes.setting}>Settings</Link></li>
                    </ul>
                    <ul className="actions stacked">
                        <li><a href={Externals.AssistantApps} className="button primary fit">AssistantApps</a></li>
                        <li><a href={Externals.KurtLourens} className="button fit">Kurt Lourens</a></li>
                    </ul>
                </div>
                <a className="close" href="#menu" onClick={onMenuClick}>Close</a>
            </nav>
        </div>
    );
}