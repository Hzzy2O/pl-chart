import { KeyPoint } from './types';
import { CHART_CONFIG, COLORS } from './constants';
import cn from 'classnames'
import { useAtom } from 'jotai';
import { chartDataAtom, hoverDataAtom } from './atoms';
import { useNearPoint } from './useChartLogic';

export const KeyPoints: React.FC = () => {
  const [chartData] = useAtom(chartDataAtom);
  const [hoverData] = useAtom(hoverDataAtom);

  const { innerHeight, margin } = CHART_CONFIG;
  const [nearPoint] = useNearPoint({
    chartData,
    hoverData
  })

  if (chartData == null) return null

  const { keyPoints } = chartData

  return (
    <g transform={`translate(${margin.left},${innerHeight + margin.top + 40})`}>
      {keyPoints.map((point: KeyPoint, index: number) => (
        <g key={index} transform={`translate(${index * 230},0)`}>
          <circle 
            r={6}
            fill={!nearPoint || nearPoint.x === point.x ? point.color : COLORS.GREY}
            className={cn(
              'transition-transform duration-300 ease-in-out transform',
              {
                'scale-125': nearPoint?.x === point.x, 
                'scale-100': nearPoint?.x !== point.x 
              }
            )}
          />
          <text 
            x={20}
            y={3}
            alignmentBaseline='middle'
            fontSize={20}
            fill={!nearPoint || nearPoint.x === point.x ? 'black' : COLORS.GREY} // 设置文字颜色
            className={cn(
              'transition-all duration-300 ease-in-out',
              {
                'drop-shadow-lg': nearPoint?.x === point.x
              }
            )}
          >{point.label}</text>
        </g>
      ))}
    </g>
  );
};
