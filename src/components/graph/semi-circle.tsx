import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ANIMATION_DURATION_TIME } from "./setting";

type Props = {
  values: { name: string; value: number }[];
  themeColor: string[];
  background: string;
};

const SemiCircleComponent: FC<Props> = ({ values, themeColor, background }) => {
  const options = {
    chart: {
      backgroundColor: background,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    colors: themeColor,
    exporting: { enabled: false },
    title: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat:
        "{series.name}: <b>{point.percentage:.1f}%</b><br/><p>金額：{point.y}円</p>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        animation: {
          duration: ANIMATION_DURATION_TIME,
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "資産割合",
        innerSize: "50%",
        data: values.map((value) => [value.name, value.value]),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

SemiCircleComponent.displayName = "SemiCircle";

export const SemiCircle = React.memo(SemiCircleComponent);
