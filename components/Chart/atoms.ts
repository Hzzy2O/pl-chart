import { atom } from 'jotai';
import { ChartData, HoverData } from './types';

export const chartDataAtom = atom<ChartData | null>(null);
export const hoverDataAtom = atom<HoverData | null>(null);
