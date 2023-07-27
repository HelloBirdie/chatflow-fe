import { MarkerType } from 'reactflow';
export interface IEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  markerEnd: EdgeMarkerType;
  style: CSSProperties;
}
