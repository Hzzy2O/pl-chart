import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { chartDataAtom, hoverDataAtom } from './atoms';
import { COLORS } from './constants';
import { KeyPoint } from './types';
import { useNearPoint } from './useChartLogic';

export const LinePlot: React.FC = () => {
  const [chartData] = useAtom(chartDataAtom)
  const [hoverData] = useAtom(hoverDataAtom)

  const [nearPoint] = useNearPoint({
    chartData,
    hoverData,
  })

  if(chartData == null) return null

  const { strikePrice, premium, xScaleCalc: x, yScaleCalc: y, maxPrice, lineData } = chartData

  const lossLine = d3.line<number>()
    .x((d) => x(d))
    .y(d => y(Math.max(-premium, Math.min(0, d - strikePrice - premium))));

  const profitLine = d3.line<number>()
    .x(d => x(d))
    .y(d => y(Math.max(0, d - strikePrice - premium)))

  const profitArea = d3.area<number>()
    .x(d => x(d + 3))
    .y0(y(0))
    .y1(d => y(Math.max(0, d - strikePrice - premium)))

  const lossArea = d3.area<number>()
    .x(d => x(d))
    .y0(y(0))
    .y1(d => y(Math.max(-premium, Math.min(0, d - strikePrice - premium))))


  return (
    <>
      <path
        d={lossLine(lineData) || ''}
        fill="none"
        stroke={COLORS.ORANGE}
        strokeWidth={2}
      />
      <path
        d={profitLine(lineData) || ''}
        fill="none"
        stroke={COLORS.GREEN}
        strokeWidth={2}
      />
      <path
        d={lossArea(lineData) || ''}
        fill="rgba(255, 86, 9, 0.2)"
      />
      <path
        d={profitArea(lineData) || ''}
        fill="rgba(2, 199, 7, 0.2)"
      />
      <line x1={0} x2={x(maxPrice)} y1={y(0)} y2={y(0)} stroke="currentColor" />
      <g>
        {chartData.keyPoints.map((point: KeyPoint, index: number) => (
            <circle 
              key={index}
              cx={x(point.x)}
              cy={y(point.y)}
              r={nearPoint?.x === point.x ? 12 : 8}
              fill={point.color}
              className='transition-[r] duration-80 ease-in-out'
            />
        ))}
      </g>
    </>
  );
};
