
import { TenderStage } from './tender';

// Defines an action that can be taken at a certain stage
export interface StageAction {
  action: string;
  label: string;
  nextStage: TenderStage;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  isDestructive?: boolean;
}

// Defines the properties of a single tender stage
export interface StageDefinition {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  actions: StageAction[];
}
