import { TenderStage } from '../types/tender';
import { StageAction, StageDefinition } from '../types/stage';
import { FileText, Clock, CreditCard, Edit3, Eye, CheckCircle, Send, Trophy, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';

export const stageConfig: Record<TenderStage, StageDefinition> = {
  'under-preview': {
    label: 'Under Preview',
    color: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: Eye,
    description: 'Initial review and assessment',
    actions: [
      { action: 'go', label: 'Go', nextStage: 'payment-pending', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
      { action: 'no-go', label: 'No-Go', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, iconColor: 'text-red-600', isDestructive: true },
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
      { action: 'paid', label: 'Paid', nextStage: 'pending-preparing-proposals', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, iconColor: 'text-red-600', isDestructive: true },
    ],
  },
  'pending-preparing-proposals': {
    label: 'Pending Preparing Proposals',
    color: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    icon: Clock,
    description: 'Ready to start preparing proposals',
    actions: [
      { action: 'start-preparing', label: 'Start Preparing', nextStage: 'preparing-proposals', color: 'bg-blue-600 hover:bg-blue-700', icon: Edit3, iconColor: 'text-blue-600' },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, iconColor: 'text-red-600', isDestructive: true },
    ],
  },
  'preparing-proposals': {
    label: 'Preparing Proposals',
    color: 'border-indigo-200',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    icon: Edit3,
    description: 'Proposals in preparation',
    actions: [
      { action: 'finished-preparing', label: 'Finished Preparing', nextStage: 'reviewing-proposals', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, iconColor: 'text-red-600', isDestructive: true },
    ],
  },
  'reviewing-proposals': {
    label: 'Reviewing Proposals',
    color: 'border-cyan-200',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    icon: Eye,
    description: 'Proposals under review',
    actions: [
      { action: 'accept', label: 'Accept', nextStage: 'pending-submitting', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
      { action: 'reject', label: 'Reject', nextStage: 'preparing-proposals', color: 'bg-orange-600 hover:bg-orange-700', icon: AlertTriangle, iconColor: 'text-orange-600', isDestructive: true },
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
      { action: 'submit', label: 'Submit', nextStage: 'submitted', color: 'bg-blue-600 hover:bg-blue-700', icon: Send, iconColor: 'text-blue-600' },
      { action: 'cancel', label: 'Cancel', nextStage: 'canceled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle, iconColor: 'text-red-600', isDestructive: true },
    ],
  },
  'submitted': {
    label: 'Submitted',
    color: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: Send,
    description: 'Proposal submitted, awaiting results',
    actions: [],
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
  'pending-preparing-proposals',
  'preparing-proposals',
  'reviewing-proposals',
  'pending-submitting',
  'submitted',
  'won',
  'lost',
  'canceled'
];
