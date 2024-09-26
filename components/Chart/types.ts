export interface ChartProps {
  strikePrice: number;
  premium: number;
}

export interface ChartData {
  keyPoints: KeyPoint[];
  lineData: number[];
  yAxisPoints: YAxisPoint[];
  strikePrice: number; 
  premium: number; 
  maxPrice: number;
  minPrice: number;
  maxLoss: number;
  maxGain: number;
  xScaleCalc: d3.ScaleLinear<number, number>;
  yScaleCalc: (y: number) => number;
}
interface YAxisPoint {
  label: string;
  pos: number;
}

export interface KeyPoint {
  x: number;
  y: number;
  label: string;
  color: string;
}

export interface HoverData {
  price: number;
  pl: number;
  pointer: [number, number];
  lineX: number;
}
