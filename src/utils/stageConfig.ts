import { TenderStage } from '../types/tender';
import { FileText, Clock, CreditCard, Edit3, Eye, CheckCircle, Send, Trophy, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';

// Defines an action that can be taken at a certain stage
export interface StageAction {
  action: string;
  label: string;
  nextStage: TenderStage;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
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

export const stageConfig: Record<TenderStage, StageDefinition> = {
  'under-preview': {
    label: 'Under Preview',
    color: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: Eye,
    description: 'Initial review and assessment',
    actions: [
      { action: 'go', label: 'Go', nextStage: 'payment-pending', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
      { action: 'no-go', label: 'No-Go', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, isDestructive: true },
    ],
  },
  'payment-pending': {
    label: 'Payment Pending',
    color: 'border-yellow-200',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    icon: CreditCard,
    description: 'Awaiting payment processing',
    actions: [
      { action: 'paid', label: 'Mark as Paid', nextStage: 'document-paid', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, isDestructive: true },
    ],
  },
  'document-paid': {
    label: 'Document Paid',
    color: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    icon: CheckCircle,
    description: 'Payment completed, ready to proceed',
    actions: [
      { action: 'prepare-technical', label: 'Prepare Technical', nextStage: 'preparing-technical', color: 'bg-blue-600 hover:bg-blue-700', icon: Edit3 },
      { action: 'prepare-financial', label: 'Prepare Financial', nextStage: 'preparing-financial', color: 'bg-purple-600 hover:bg-purple-700', icon: Edit3 },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, isDestructive: true },
    ],
  },
  'preparing-technical': {
    label: 'Preparing Technical',
    color: 'border-indigo-200',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    icon: Edit3,
    description: 'Technical proposal in preparation',
    actions: [
      { action: 'done-technical', label: 'Technical Complete', nextStage: 'reviewing-technical', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
    ],
  },
  'preparing-financial': {
    label: 'Preparing Financial',
    color: 'border-purple-200',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: Edit3,
    description: 'Financial proposal in preparation',
    actions: [
      { action: 'done-financial', label: 'Financial Complete', nextStage: 'reviewing-financial', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
    ],
  },
  'reviewing-technical': {
    label: 'Reviewing Technical',
    color: 'border-cyan-200',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    icon: Eye,
    description: 'Technical proposal under review',
    actions: [
      { action: 'accept-technical', label: 'Accept Technical', nextStage: 'pending-submitting', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
      { action: 'reject-technical', label: 'Reject Technical', nextStage: 'preparing-technical', color: 'bg-orange-600 hover:bg-orange-700', icon: AlertTriangle, isDestructive: true },
    ],
  },
  'reviewing-financial': {
    label: 'Reviewing Financial',
    color: 'border-teal-200',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    icon: Eye,
    description: 'Financial proposal under review',
    actions: [
      { action: 'accept-financial', label: 'Accept Financial', nextStage: 'pending-submitting', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle },
      { action: 'reject-financial', label: 'Reject Financial', nextStage: 'preparing-financial', color: 'bg-orange-600 hover:bg-orange-700', icon: AlertTriangle, isDestructive: true },
    ],
  },
  'pending-submitting': {
    label: 'Pending Submission',
    color: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    icon: Clock,
    description: 'Ready for submission',
    actions: [
      { action: 'submit', label: 'Submit Proposal', nextStage: 'submitted', color: 'bg-blue-600 hover:bg-blue-700', icon: Send },
    ],
  },
  'submitted': {
    label: 'Submitted',
    color: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: Send,
    description: 'Proposal submitted, awaiting results',
    actions: [
      { action: 'won', label: 'Mark as Won', nextStage: 'won', color: 'bg-green-600 hover:bg-green-700', icon: Trophy },
      { action: 'lost', label: 'Mark as Lost', nextStage: 'lost', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, isDestructive: true },
    ],
  },
  'won': {
    label: 'Won',
    color: 'border-green-200',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    icon: Trophy,
    description: 'Tender awarded successfully',
    actions: [],
  },
  'lost': {
    label: 'Lost',
    color: 'border-red-200',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: XCircle,
    description: 'Tender not awarded',
    actions: [],
  },
  'canceled': {
    label: 'Canceled',
    color: 'border-gray-200',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    icon: XCircle,
    description: 'Tender process canceled',
    actions: [],
  }
};

export const priorityConfig = {
  high: {
    label: 'High',
    color: 'bg-red-100 text-red-800 border-red-200',
    dotColor: 'bg-red-500'
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dotColor: 'bg-yellow-500'
  },
  low: {
    label: 'Low',
    color: 'bg-green-100 text-green-800 border-green-200',
    dotColor: 'bg-green-500'
  }
};

export const stageOrder: TenderStage[] = [
  'under-preview',
  'payment-pending',
  'document-paid',
  'preparing-technical',
  'preparing-financial',
  'reviewing-technical',
  'reviewing-financial',
  'pending-submitting',
  'submitted',
  'won',
  'lost',
  'canceled'
];
