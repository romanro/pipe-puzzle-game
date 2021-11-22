import { ViewportDimensions } from '../GameViewport.models';

export interface IViewPortMapPreviewProps {
    dimensions: ViewportDimensions;
    mapSize: { width: number; height: number };
}
