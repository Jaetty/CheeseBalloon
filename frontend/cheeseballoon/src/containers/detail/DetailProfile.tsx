import DetailProfileContent from "src/containers/detail/DetailProfileContent";
import style from "src/containers/detail/DetailProfile.module.scss";

export default function DetailProfile() {
  return (
    <div className={style.wrapper}>
      <DetailProfileContent />
    </div>
  );
}
