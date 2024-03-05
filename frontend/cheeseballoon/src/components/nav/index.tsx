import Menubutton from "src/components/nav/menubutton";
import styles from "src/components/nav/index.module.scss";

// import dynamic from "next/dynamic"; // Import dynamic from Next.js

// const DynamicButton = dynamic(() => import("src/components/nav/menubutton"), {
//   ssr: false,
// });

export default function Nav() {
  return (
    <div>
      <div className={styles.nav}>
        {/* <DynamicButton /> */}
        <Menubutton />
      </div>
    </div>
  );
}
