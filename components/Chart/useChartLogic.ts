import { useRef, useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { ChartProps, ChartData, HoverData, KeyPoint } from './types';
import { calculateChartData } from './calc';
import { CHART_CONFIG } from './constants';
import { chartDataAtom, hoverDataAtom } from './atoms';
import { useAtom } from 'jotai';

export const useChartLogic = (props: ChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [chartData, setChartData] = useAtom(chartDataAtom);
  const [, setHoverData] = useAtom(hoverDataAtom);

  useEffect(() => {
    const data = calculateChartData(props);
    setChartData(data);
  }, [props, setChartData]);

  const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (!chartData) return;
    const svg = svgRef.current;
    if (!svg) return;

    const { margin } = CHART_CONFIG
    const { xScaleCalc, premium, strikePrice, maxPrice, maxGain } = chartData
    const pointer = d3.pointer(event, svg)
    const [ mouseX ] = pointer

    let price = xScaleCalc.invert(mouseX - margin.left);
    price = Math.max(strikePrice, Math.min(maxPrice, price));

    const pl = Math.max(-premium, Math.min(maxGain, price - strikePrice - premium));
    const lineX = xScaleCalc(price);

    setHoverData({ price, pl, pointer, lineX });
  }, [chartData, setHoverData]);

  return { svgRef, handleMouseMove };
};

interface UseNearPointProps {
  chartData: ChartData | null;
  hoverData: HoverData | null;
}

export function useNearPoint({ chartData, hoverData }: UseNearPointProps): [KeyPoint | null] {
  const [nearPoint, setNearPoint] = useState<KeyPoint | null>(null);

  useEffect(() => {
    if (!chartData || !hoverData) return;
    const { xScaleCalc, keyPoints } = chartData
    
    const { lineX } = hoverData;

    const nearKeyPoint = keyPoints.find(point => Math.abs(xScaleCalc(point.x) - lineX) < 20);

    setNearPoint(nearKeyPoint || null);

  }, [hoverData, chartData]);

  return [nearPoint];
}
