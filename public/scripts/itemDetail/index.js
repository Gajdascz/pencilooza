import { dropdownController } from './core/dropdownController.js';
import { viewManager } from './core/viewManager.js';
import { cache } from './core/cache.js';
// dropdown toggle
const handleDropdownToggle = (e) => dropdownController.toggle(e);

const handleOptionSelect = (e, { groupName, optionName, ppuDiff, link }) =>
  dropdownController.selectOption(e, { groupName, optionName, ppuDiff, link });

document.addEventListener('DOMContentLoaded', () => {
  const dropdownContainers = [...document.querySelectorAll('div.dropdown-container')];
  const dropdownToggleButtons = dropdownContainers.map((container) =>
    container.querySelector('button.dropdown-toggle')
  );
  const basePpu = document.querySelector('span[data-base-ppu]').dataset.basePpu;
  const defaultSelected = { quantityPricing: null, options: [] };
  dropdownToggleButtons.forEach((dropdown) => dropdown.addEventListener('click', handleDropdownToggle));
  const { quantityPricing, optionGroups } = dropdownContainers.reduce(
    (acc, curr) => {
      if (curr.dataset.forMenuId === 'quantitySelectToggle') acc.quantityPricing = curr;
      else acc.optionGroups.push(curr);
      return acc;
    },
    { quantityPricing: null, optionGroups: [] }
  );
  quantityPricing.querySelectorAll('li[role="option"]').forEach((option) => {
    const { groupName, optionName: quantity, ppuDiff } = option.dataset;
    if (option.classList.contains('selected-option')) defaultSelected.quantityPricing = { quantity, ppuDiff };
    option.addEventListener('click', (e) => handleOptionSelect(e, { groupName, optionName: quantity, ppuDiff }));
  });
  optionGroups.forEach((optionGroup) =>
    optionGroup.querySelectorAll('li[role="option"]').forEach((option) => {
      const { groupName, optionName, ppuDiff, link } = option.dataset;
      if (option.classList.contains('selected-option'))
        cache.addCachedOptionGroup(groupName, { optionName, ppuDiff: +ppuDiff, link });
      option.addEventListener('click', (e) => handleOptionSelect(e, { groupName, optionName, ppuDiff, link }));
    })
  );
  cache.setBasePpu(+basePpu);
  cache.updateSelectedQuantityPricing(
    +defaultSelected.quantityPricing.quantity,
    +defaultSelected.quantityPricing.ppuDiff
  );
  viewManager.updateAll();
});
export { handleDropdownToggle, handleOptionSelect };
