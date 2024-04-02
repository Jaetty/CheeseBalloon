import style from "src/components/ranking/subrankAll.module.scss";

export default function SubrankAll() {
  const numbers = Array.from({ length: 12 }, (_, index) => index + 4);
  return (
    <div className={style.container}>
      {numbers.map((number) => (
        <div key={number} className={style.subitem}>
          {number}
        </div>
      ))}
    </div>
  );
}
