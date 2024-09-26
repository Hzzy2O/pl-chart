'use client'
import React from 'react';
import { useChartLogic } from './useChartLogic';
import { ChartProps } from './types';
import { CHART_CONFIG } from './constants';
import { Axes } from './Axes';
import { LinePlot } from './LinePlot';
import { KeyPoints } from './KeyPoints';
import { HoverLine } from './HoverLine';
import { Tips } from './Tips';

const PLChart: React.FC<ChartProps> = (props) => {
  const { svgRef, handleMouseMove } = useChartLogic(props);
  const { width, height, margin } = CHART_CONFIG;

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} onMouseMove={event => handleMouseMove(event)}>
      <Tips />
      <g transform={`translate(${margin.left},${margin.top})`} strokeWidth={2}>
        <Axes />
        <HoverLine />
        <LinePlot />
      </g>
      <KeyPoints />
    </svg>
    </div>
  );
};

export default PLChart;
