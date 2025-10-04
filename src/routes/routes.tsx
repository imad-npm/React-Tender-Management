import TenderListPage from '../pages/TenderListPage';
import PipelinePage from '../pages/PipelinePage';

export const routes = [
  {
    path: '/',
    element: <TenderListPage />,
  },
  {
    path: '/pipeline',
    element: <PipelinePage />,
  },
];
