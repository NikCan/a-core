import React, { memo, useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import s from './DropDown.module.scss';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  title: string;
}

export const DropdownWithCheckboxes: React.FC<Props> = memo(
  ({ options, title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className={s.dropDown} ref={dropdownRef}>
        <Button onClick={toggleDropdown} className={s.dropDownBtn}>
          {title}
          <img src="a-core/arrow-down.svg" alt="arrow" />
        </Button>
        {isOpen && (
          <ul className={s.dropDownList}>
            {options.map((option) => (
              <li key={option.value} className={s.dropDownItem}>
                <input
                  type="checkbox"
                  id={option.value}
                  className={s.checkbox}
                />
                <label htmlFor={option.value} className={s.label}>
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

DropdownWithCheckboxes.displayName = 'DropdownWithCheckboxes';
