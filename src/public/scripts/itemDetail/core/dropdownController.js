import { cache } from './cache.js';
import { viewManager } from './viewManager.js';

export const dropdownController = {
  current: null,
  setCurrent: (menuContainer) => {
    dropdownController.current = {
      container: menuContainer,
      isExpanded: menuContainer.getAttribute('aria-expanded') === 'true',
      toggleButton: menuContainer.querySelector('.dropdown-toggle'),
      optionList: menuContainer.querySelector('.dropdown-menu-option-list'),
      options: menuContainer.querySelectorAll('[role="option"]'),
    };
  },
  close: (e) => {
    const { container, toggleButton, optionList } = dropdownController.current;
    container.setAttribute('aria-expanded', false);
    toggleButton.setAttribute('aria-expanded', false);
    optionList.style.display = 'none';
    document.removeEventListener('click', dropdownController.closeListener);
    dropdownController.current = null;
  },
  closeListener: (e) => {
    const { optionList, toggleButton, isExpanded } = dropdownController.current;
    if (e.target === toggleButton && !isExpanded) return;
    if (optionList.contains(e.target)) return;
    dropdownController.close();
  },
  open: (e) => {
    dropdownController.setCurrent(e.target.parentElement);
    const { container, toggleButton, optionList } = dropdownController.current;
    container.setAttribute('aria-expanded', true);
    toggleButton.setAttribute('aria-expanded', true);
    optionList.style.display = 'flex';
    document.addEventListener('click', dropdownController.closeListener);
  },
  selectOption: (e, { groupName, optionName, ppuDiff, link }) => {
    e.preventDefault();
    if (groupName === 'quantity') cache.updateSelectedQuantityPricing(optionName, ppuDiff);
    else cache.updateSelectedOption(groupName, optionName, ppuDiff, link);
    viewManager.updateMenuSelection({ groupName, optionName, ppuDiff }, e.target.parentElement.children);
    viewManager.updateAll();
  },
  toggle: (e) => {
    e.preventDefault();
    if (!dropdownController.current) dropdownController.open(e);
    else dropdownController.close(e);
  },
};
