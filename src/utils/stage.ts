import { TenderStage } from '../types/tender';
import { stageConfig } from './stageConfig';

export const getActionDescription = (nextStage: TenderStage) => {
  const nextStageConfig = stageConfig[nextStage];
  return `This will move the tender to "${nextStageConfig.label}" stage.`;
};
