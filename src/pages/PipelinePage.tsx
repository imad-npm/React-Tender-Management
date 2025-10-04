import PipelineView from '../components/PipelineView';
import { useFilteredTenders } from '../store/tenderStore';

const PipelinePage = () => {
  const tenders = useFilteredTenders();

  return (
    <PipelineView tenders={tenders} />
  );
};

export default PipelinePage;
