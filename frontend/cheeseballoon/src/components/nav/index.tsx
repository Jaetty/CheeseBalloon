import Menubutton from "src/components/nav/menubutton";
import styles from "src/components/nav/index.module.scss";
import Searchbar from "src/components/nav/searchbar/index";
import IsLogin from "src/components/nav/isLogin/index";

export default function Nav() {
  return (
    <div>
      <div className={styles.nav}>
        <Menubutton />
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
