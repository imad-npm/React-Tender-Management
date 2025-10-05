
import { Tender } from './tender';

export interface StageActionModalProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface DocumentPreviewModalProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatPanelProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
}
