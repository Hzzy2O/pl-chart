import { COLORS } from './constants';
import { useAtom } from 'jotai';
import { chartDataAtom, hoverDataAtom } from './atoms';
import { CHART_CONFIG } from './constants';

export const Tips: React.FC = () => {
  const [chartData] = useAtom(chartDataAtom);
  const [hoverData] = useAtom(hoverDataAtom);

  if (hoverData === null || chartData === null) return null;

  const { innerWidth, margin } = CHART_CONFIG;
  const { pl } = hoverData

  const unit = pl > 0 ? "+" : pl < 0 ? "-"  : ""
  const plValue = Math.abs(pl).toLocaleString(undefined, {maximumFractionDigits: 0})

  return (
    <>
      <text 
        x={innerWidth / 2 + margin.left}
        y={20}
        fill={COLORS.GREY}
        fontSize={25}
        textAnchor="middle"
      >Expected Profit & Loss</text>
      <text 
        x={innerWidth / 2 + margin.left} 
        y={60}
        textAnchor="middle" 
        fontSize="28px"
        fontWeight="bold"
        fill={pl >= 0 ? COLORS.GREEN : COLORS.ORANGE}
      >
        {unit}${plValue}
      </text>
    </>
  );
};
