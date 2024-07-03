"use client";

import Menubutton from "src/components/nav/MenuButton";
import MobileMenuButton from "src/components/nav/MobileMenuButton";
import styles from "src/components/nav/index.module.scss";
import Searchbar from "src/components/nav/searchbar/index";
import IsLogin from "src/components/nav/islogin/index";
import MainLogo from "src/components/nav/MainLogo";
import Menu from "src/components/nav/MobileMenu";
import searchBtn from "src/stores/search_button.png";
import { isMobileState } from "src/stores/store";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const isMobile = isMobileState((state) => state.isMobile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className={styles.nav}>
        <div className={styles.logowrap}>
          {isMobile ? (
            <MobileMenuButton onToggle={handleMenuToggle} />
          ) : (
            <Menubutton />
          )}
          <div className={styles.mainlogo}>
            <MainLogo />
          </div>
        </div>
        <div className={styles.searchbar}>
          <Searchbar />
        </div>
        <div className={styles.islogin}>
          <div className={styles.searchbtn}>
            {isSmallScreen && (
              <Image
                src={searchBtn}
                alt="Search Button"
                width={25}
                height={25}
              />
            )}
          </div>
          <IsLogin />
        </div>
      </div>
      {isMobile && isMenuOpen && (
        <Menu
          isOpen={isMenuOpen}
          onClose={handleMenuToggle}
          closeMenu={closeMenu}
        />
      )}
    </div>
  );
}
