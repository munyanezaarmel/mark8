
import { Skeleton as AntSkeleton } from 'antd';

const Skeleton = () => (
  <div className="p-4">
    <AntSkeleton active avatar paragraph={{ rows: 4 }} />
    <AntSkeleton active paragraph={{ rows: 4 }} />
    <AntSkeleton active paragraph={{ rows: 4 }} />
  </div>
);

export default Skeleton;