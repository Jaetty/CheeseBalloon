import Menubutton from "src/components/nav/menubutton";
import styles from "src/components/nav/index.module.scss";
import Searchbar from "src/components/nav/searchbar/index";
import IsLogin from "src/components/nav/isLogin/index";
import MainLogo from "src/components/nav/mainlogo";

export default function Nav() {
  return (
    <div>
      <div className={styles.nav}>
        <div className={styles.logowrap}>
          <Menubutton />
          <div className={styles.mainlogo}>
            <MainLogo />
          </div>
        </div>
        <div className={styles.searchbar}>
          <Searchbar />
        </div>
        <div className={styles.islogin}>
          <IsLogin />
        </div>
      </div>
    </div>
  );
}
