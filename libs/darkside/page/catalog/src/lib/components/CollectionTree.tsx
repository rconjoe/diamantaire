import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

import { getCollectionTree } from '../api/index';

interface TreeData {
  name: string;
  attributes: {
    id: string;
    slug: string;
  };
  children: TreeData[];
}

interface TreeDataProps {
  collectionSlug: string;
  width?: string;
  height?: string;
}

const CollectionTree = ({ collectionSlug, width, height }: TreeDataProps) => {
  const ref = useRef(null);
  const Tree = dynamic(() => import('react-d3-tree'));
  const [treeData, setTreeData] = useState<TreeData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const d = await getCollectionTree(collectionSlug);

      setTreeData(d);
    };

    fetchData();
  }, [collectionSlug]);

  useEffect(() => {
    setDimensions(ref?.current?.getBoundingClientRect());
  }, [collectionSlug]);

  if (!collectionSlug) {
    return <strong>Select Collection</strong>;
  }

  if (!treeData) {
    return <strong>Fetching data...</strong>;
  }

  return (
    <div ref={ref} id="treeWrapper" style={{ width: width || '100%', height: height || '100vh' }}>
      <Tree data={treeData} orientation="vertical" initialDepth={0} translate={{ x: dimensions?.width / 2 || 300, y: 50 }} />
    </div>
  );
};

export { CollectionTree };
