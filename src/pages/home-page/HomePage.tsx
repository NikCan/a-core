import { GET_TREE, GetTreeResponse, IChildren } from '@/api';
import { SearchFilters, TreeComponent } from '@/components';
import { useQuery } from '@apollo/client';
import { memo, useCallback, useState } from 'react';
import s from './HomePage.module.scss';

export const HomePage = memo(() => {
  const { data } = useQuery<GetTreeResponse>(GET_TREE);
  const [currentNode, setCurrentNode] = useState<IChildren>();
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const handleNodeClick = useCallback((node: IChildren) => {
    setCurrentNode(node);
  }, []);

  return (
    <div className={s.page}>
      <div className={s.header}>
        <span className={s.title}>Классы</span>
        <SearchFilters
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={s.content}>
        <div className={s.treeContainer}>
          <TreeComponent
            data={data ? data.modelTreeClasses.tree : null}
            searchText={searchText}
            onNodeClick={handleNodeClick}
          />
        </div>
        <div className={s.descriptionContainer}>
          <span className={s.title}>Описание</span>
          <div className={s.description}>{currentNode?.description}</div>
        </div>
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';
