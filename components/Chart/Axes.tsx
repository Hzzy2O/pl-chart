import { useAtom } from 'jotai';
import { chartDataAtom } from './atoms';
import { CHART_CONFIG } from './constants';

export const Axes: React.FC = () => {
  const [chartData] = useAtom(chartDataAtom);

  if(!chartData) return null;

  const { innerWidth, innerHeight } = CHART_CONFIG;
  const { maxLoss, maxGain, yAxisPoints, yScaleCalc: y } = chartData;

  return (
    <>
      <line 
        x1={-50}
        x2={innerWidth}
        y1={y(maxGain)}
        y2={y(maxGain)}
        stroke="#0C0C0C"
        strokeDasharray="0, 8"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line 
        x1={-50}
        x2={innerWidth}
        y1={y(-maxLoss * 4)}
        y2={y(-maxLoss * 4)}
        stroke="#0C0C0C"
        strokeDasharray="0, 8"
        strokeLinecap="round"
        strokeWidth="3"
      />
      {
        yAxisPoints.map(point => 
          <text
            key={point.label}
            x={-25}
            y={innerHeight * point.pos}
            textAnchor='middle'
            dominantBaseline='middle'
            fontSize={24}
          >{point.label}</text>
        )
      }
    </>
  );
};
