import { useMemo, useState, useCallback, memo } from 'react';
import Tree from 'rc-tree';
import { DataNode, IconType } from 'rc-tree/lib/interface';
import { IChildren } from '@/api';
import './tree.scss';
import { TreeControl } from '../tree-control/TreeControl';

interface TreeComponentProps {
  data: IChildren[] | null;
  searchText: string;
  onNodeClick: (node: IChildren) => void;
}

export const TreeComponent = memo(
  ({ data, searchText, onNodeClick }: TreeComponentProps) => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

    const switcher: IconType = (obj) => (
      <img
        src="/a-core/arrow-down.svg"
        alt="arrow"
        style={{
          transform: obj.expanded ? 'none' : 'rotate(-90deg)',
          opacity: obj.isLeaf ? 0 : 1,
        }}
      />
    );

    const handleExpandAll = useCallback(() => {
      if (!data) return;
      const allKeys: React.Key[] = [];
      const traverse = (nodes: IChildren[]) => {
        nodes.forEach((node) => {
          allKeys.push(node.id);
          if (node.children) {
            traverse(node.children);
          }
        });
      };
      traverse(data);
      setExpandedKeys(allKeys);
    }, [data]);

    const handleCollapseAll = useCallback(() => {
      setExpandedKeys([]);
    }, []);

    const handleExpand = useCallback((keys: React.Key[]) => {
      setExpandedKeys(keys);
    }, []);

    const filteredTreeData = useMemo(() => {
      if (!data) return [];
      const filterNodes = (nodes: IChildren[]): DataNode[] => {
        return nodes.reduce((acc: DataNode[], node: IChildren) => {
          const shouldIncludeNode = node.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

          // Recursively filter children nodes
          const filteredChildren = node.children
            ? filterNodes(node.children)
            : [];

          // Include node if it or its children match the search text
          if (shouldIncludeNode || filteredChildren.length > 0) {
            acc.push({
              title: (
                <span
                  className="custom-title"
                  onClick={() => onNodeClick(node)}
                >
                  {node.name}
                </span>
              ),
              icon: (
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onClick={(e) => e.stopPropagation()}
                />
              ),
              key: node.id,
              children:
                filteredChildren.length > 0 ? filteredChildren : undefined,
            });
          }

          return acc;
        }, []);
      };

      return filterNodes(data);
    }, [searchText, data, onNodeClick]);

    return (
      <>
        <TreeControl
          disabled={!data}
          onCollapseAll={handleCollapseAll}
          onExpandAll={handleExpandAll}
        />
        {data && (
          <Tree
            switcherIcon={switcher}
            treeData={filteredTreeData}
            onExpand={handleExpand}
            expandedKeys={expandedKeys}
          />
        )}
      </>
    );
  }
);

TreeComponent.displayName = 'TreeComponent';
