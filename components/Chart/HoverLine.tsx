import React from 'react';
import { useAtom } from 'jotai';
import { chartDataAtom, hoverDataAtom } from './atoms';
import { COLORS, CHART_CONFIG } from './constants';

export const HoverLine: React.FC = () => {
  const [chartData] = useAtom(chartDataAtom);
  const [hoverData] = useAtom(hoverDataAtom);

  if (hoverData === null || chartData === null) return null;

  const { yScaleCalc: y } = chartData;
  const { lineX, price } = hoverData;
  const { innerWidth } = CHART_CONFIG;

  const threshold = innerWidth * 0.9;
  
  const textX = lineX > threshold ? threshold : lineX;

  return (
    <>
      <g 
        className="hover-circle"
        transform={`translate(${lineX},${y(0)})`}
      >
        <circle 
          r="40"
          fill="none"
          stroke={COLORS.GREEN}
          strokeWidth="2"
        />
        <circle 
          r="28" 
          fill={COLORS.GREEN}
        />
      </g>
      <line 
        x1={lineX} 
        x2={lineX} 
        y1="0"
        y2="240" 
        stroke="#303030" 
        strokeWidth="2" 
      />
      <text 
        x={textX}
        fontSize={24}
        y={-60}
        fill={COLORS.BLACK}
        textAnchor="middle"
      >
        <tspan style={{fill: COLORS.GREY}}>BTC Price at Exp: </tspan>
        {'\n'}
        <tspan 
          x={textX}
          fontSize="26px"
          fontWeight="bold"
          color="black"
          dy="1.2em"
        >${price.toLocaleString(undefined, {maximumFractionDigits: 0})}</tspan>
      </text>
    </>
  );
};
