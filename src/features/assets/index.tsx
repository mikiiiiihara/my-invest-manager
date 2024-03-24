import React, { FC, useCallback, useMemo, useState } from "react";
import { summarizeAllAssets } from "./logic/summarize-all-asset";
import { Center } from "../../components/common/center/center";
import { PrimaryButton } from "../../components/button/primary-button/primary-button";
import { HomeMain } from "./home-main";
import { Empty } from "../../components/graph/empty";
import { Asset } from "./logic/calculate-all-assets";
import { Modal } from "@/components/modal/modal";
import { CreateForm } from "./forms/create";
import { UpdateForm } from "./forms/update";

export type Props = {
  assets: Asset[];
  currentUsdJpy: number;
};

type SelectedGroups = {
  [key: string]: boolean;
  usStock: boolean;
  japanFund: boolean;
  crypto: boolean;
  fixedIncomeAsset: boolean;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const AssetsComponent: FC<Props> = ({ assets, currentUsdJpy }) => {
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroups>({
    usStock: true,
    japanFund: true,
    crypto: true,
    fixedIncomeAsset: true,
  });
  const [showAddModal, setAddModal] = useState(false);
  const ShowAddModal = useCallback(() => setAddModal(true), []);
  const [showUpdModal, setUpdModal] = useState(false);
  const ShowUpdModal = useCallback(() => setUpdModal(true), []);
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.summary);
  const changeDisplayToSummary = useCallback(
    () => setDisplayMode(DISPLAY_MODE.summary),
    []
  );
  const changeDisplayToDetail = useCallback(
    () => setDisplayMode(DISPLAY_MODE.detail),
    []
  );
  // 保有株式情報をグラフ用に加工
  const usStockSummary = useMemo(
    () =>
      summarizeAllAssets(
        assets.filter((asset) => selectedGroups[asset.group]),
        currentUsdJpy
      ),
    [assets, currentUsdJpy, selectedGroups]
  );

  const { usStockDetails, priceTotal, getPriceTotal, dividendTotal } =
    usStockSummary;
  const balanceTotal = Math.round((priceTotal - getPriceTotal) * 10) / 10;
  const balanceRateTotal = ((balanceTotal / getPriceTotal) * 100).toFixed(2);
  const balanceRateClass =
    Number(balanceRateTotal) > 0
      ? "text-success"
      : Number(balanceRateTotal) < 0
      ? "text-danger"
      : "";

  // チェックボックスの変更をハンドルする関数
  const handleCheckboxChange = useCallback((event: any) => {
    const { name, checked } = event.target;
    setSelectedGroups((prev) => ({ ...prev, [name]: checked }));
  }, []);
  // チェックボックスのレンダリング
  const renderCheckboxes = () => {
    const groupJapaneseName: { [key: string]: string } = {
      usStock: "米国株",
      japanFund: "日本投資信託",
      crypto: "仮想通貨",
      fixedIncomeAsset: "固定利回り資産",
    };

    return (
      <div>
        {Object.entries(selectedGroups).map(([group, isSelected]) => (
          <label key={group}>
            <input
              type="checkbox"
              name={group}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            {groupJapaneseName[group]}
          </label>
        ))}
      </div>
    );
  };
  return (
    <Center>
      <div className="content">
        <h1>保有株式総額¥:{priceTotal.toLocaleString()}</h1>
        <p className={balanceRateClass}>
          損益¥:{balanceTotal.toLocaleString()}（
          {isNaN(Number(balanceRateTotal)) ? 0 : balanceRateTotal}
          %）
        </p>
        <p>（USDJPY: {currentUsdJpy}）</p>
        <p>一年あたり配当総額：¥{dividendTotal.toLocaleString()}</p>
        <div className="m-3">
          <PrimaryButton
            content="ポートフォリオ"
            notSelected={displayMode !== DISPLAY_MODE.summary}
            onClick={changeDisplayToSummary}
          />
          <PrimaryButton
            content="保有銘柄一覧"
            notSelected={displayMode !== DISPLAY_MODE.detail}
            onClick={changeDisplayToDetail}
          />
        </div>
        {renderCheckboxes()}
        {usStockDetails.length > 0 ? (
          <HomeMain
            displayMode={displayMode}
            usStockDetail={usStockDetails}
            usStockSummary={usStockSummary}
          />
        ) : (
          <Empty />
        )}
      </div>
      <PrimaryButton
        content="情報を更新"
        onClick={ShowUpdModal}
        isForContent={true}
      />
      <PrimaryButton
        content="銘柄を追加"
        onClick={ShowAddModal}
        isForContent={true}
      />
      <Modal
        showFlag={showUpdModal}
        setShowModal={setUpdModal}
        content={<UpdateForm assets={assets} setShowModal={setUpdModal} />}
      />
      <Modal
        showFlag={showAddModal}
        setShowModal={setAddModal}
        content={<CreateForm setShowModal={setAddModal} />}
      />
    </Center>
  );
};
AssetsComponent.displayName = "AssetTemplate";
export const AssetTemplate = React.memo(AssetsComponent);
