"use client";

import Menubutton from "src/components/nav/MenuButton";
import MobileMenuButton from "src/components/nav/MobileMenuButton";
import styles from "src/components/nav/index.module.scss";
import Searchbar from "src/components/nav/searchbar/index";
// import IsLogin from "src/components/nav/islogin/index";
import MainLogo from "src/components/nav/MainLogo";
import Menu from "src/components/nav/MobileMenu";
import searchBtn from "src/stores/search_button.png";
import { isMobileState } from "src/stores/store";
import { useState, useEffect } from "react";
import Image from "next/image";
import SearchModal from "src/components/nav/searchbar/MobileSearch";

export default function Nav() {
  const isMobile = isMobileState((state) => state.isMobile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsSearchModalOpen(false);
    }
  }, [isMobile]);

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
        {!isMobile && (
          <div className={styles.searchbar}>
            <Searchbar />
          </div>
        )}
        <div className={styles.islogin}>
          <div className={styles.searchbtn}>
            <Image
              src={searchBtn}
              alt="Search Button"
              width={23}
              height={23}
              onClick={openSearchModal}
            />
          </div>
          {/* <IsLogin /> */}
        </div>
      </div>
      {isMobile && isMenuOpen && (
        <Menu
          isOpen={isMenuOpen}
          onClose={handleMenuToggle}
          closeMenu={closeMenu}
        />
      )}
      {isMobile && isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </div>
  );
}
