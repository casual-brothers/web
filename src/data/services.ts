export interface ServiceData {
  id: string;
  iconName: string;
  modelPath: string;
}

export const servicesData: ServiceData[] = [
  { id: "full-game-dev", iconName: "Gamepad2", modelPath: "/models/services/desarrollo-completo.glb" },
  { id: "co-dev", iconName: "Users", modelPath: "/models/services/co-desarrollo.glb" },
  { id: "porting", iconName: "MonitorSmartphone", modelPath: "/models/services/porting-plataformas.glb" },
  { id: "live-ops", iconName: "Headset", modelPath: "/models/services/live-ops-soporte.glb" },
  { id: "art-tech", iconName: "Palette", modelPath: "/models/services/arte-tech-elite.glb" },
];
