import { ChartProps, ChartData } from './types';
import { CHART_CONFIG, COLORS } from './constants';
import * as d3 from 'd3'

export const calculateChartData = (props: ChartProps): ChartData => {
  const { strikePrice, premium } = props;
  const { innerWidth, innerHeight } = CHART_CONFIG;

  const breakEvenPoint = strikePrice + premium;
  const maxLossPoint = strikePrice;
  const maxProfitPoint = strikePrice + premium * 4;

  const minPrice = strikePrice - premium * 4;
  const maxPrice = maxProfitPoint;
  const maxLoss = premium;
  const maxGain = maxPrice - strikePrice - premium;

  const xScaleCalc = d3.scaleLinear()
    .domain([minPrice, maxPrice])
    .range([0, innerWidth]);

  const yLoss = d3.scaleLinear()
      .domain([-maxLoss * 4, 0])
      .range([innerHeight, innerHeight * 0.5]);

  const yGain = d3.scaleLinear()
    .domain([0, maxGain])
    .range([innerHeight * 0.5, 0]);

  const yScaleCalc = (value: number) => value < 0 ? yLoss(value) : yGain(value);

  const lineData = d3.range(minPrice, maxPrice, (maxPrice - minPrice) / 200);

  return {
    keyPoints: [
      { x: maxLossPoint, y: -premium, label: "Max Loss", color: COLORS.ORANGE },
      { x: breakEvenPoint, y: 0, label: "Break Even", color: COLORS.BLACK },
      { x: maxProfitPoint, y: maxGain, label: "Max Profit", color: COLORS.GREEN },
    ],
    yAxisPoints: [
      { label: "+", pos: 0.3 },
      { label: "0", pos: 0.5 },
      { label: "-", pos: 0.7 },
    ],
    lineData,
    xScaleCalc,
    yScaleCalc,
    strikePrice,
    premium,
    maxPrice,
    minPrice,
    maxLoss,
    maxGain
  };
};
