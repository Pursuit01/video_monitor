export interface PositionTree {
  id: number;
  name: string;
  floorNodeList: FloorNode[];
}

export interface FloorNode {
  floorId: number;
  floor: string;
  floorIndex: number;
  doorPlateNodes: DoorPlateNode[];
  deviceNodes: DeviceNode[];
}
export interface TempFloor {
  children?: FloorNode[];
  isOrg?: boolean;

  id: number;
  name: string;
  floorNodeList?: FloorNode[];
}
export interface DoorPlateNode {
  id: number;
  number: string;
  type: string;
  deviceNodes: DeviceNode[];
}
export interface DeviceNode {
  deviceId: number;
  name: string;
  nodeType: number;
  nodeTypeName: string;
  position: string;
  status: number;
  type: string;
  typeName: string;
}
