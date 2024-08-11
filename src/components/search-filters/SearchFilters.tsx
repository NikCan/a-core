import { DropdownWithCheckboxes } from '@/components/ui';
import s from './SearchFilters.module.scss';
import { memo } from 'react';

interface SearchFiltersProps {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFilters = memo(
  ({ searchText, onSearchChange }: SearchFiltersProps) => {
    const options = [
      { label: 'Да', value: 'option1' },
      { label: 'Нет', value: 'option2' },
    ];

    return (
      <div className={s.selectors}>
        <DropdownWithCheckboxes options={options} title="Присвоенные" />
        <DropdownWithCheckboxes options={options} title="В библиотеке" />
        <input
          placeholder="Найти классы"
          value={searchText}
          onChange={onSearchChange}
          className={s.input}
        />
      </div>
    );
  }
);
SearchFilters.displayName = 'SearchFilters';
