import { Header } from "@/components/common/header/header";
import { Pie } from "@/components/graph/pie";
import { themeDefault } from "@/constants/theme-color";
import { PieData } from "@/types/pie-data.type";
import React from "react";
import styles from "./top.module.scss";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { useRouter } from "next/router";

const TopComponent = () => {
  const router = useRouter();
  // サンプルデータ
  const pieData: PieData[] = [
    { name: "ｅＭＡＸＩＳ　Ｓｌｉｍ　全世界株式", y: 10000 },
    { name: "AAPL", y: 10000 },
    { name: "MSFT", y: 10000 },
    { name: "GOOG", y: 10000 },
    { name: "btc", y: 10000 },
  ];
  return (
    <div className={styles.top}>
      <Header />
      <div className={styles.title}>
        <p>
          あらゆる資産を一元管理
          <br />
          配当収入も可視化
        </p>
        <br />
        <PrimaryButton
          content="ログイン"
          onClick={() => router.push("/signin")}
        />
      </div>
      <div className={styles.pie}>
        <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
      </div>
    </div>
  );
};
TopComponent.displayName = "TopTemplate";
export const TopTemplate = React.memo(TopComponent);
