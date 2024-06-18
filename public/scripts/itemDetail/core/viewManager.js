import { cache } from './cache.js';

export const viewManager = {
  updateTotals: ({ quantity, ppu, total }) => {
    document.querySelector('span.total-quantity').textContent = quantity;
    document.querySelector('span.total-ppu').textContent = `$${ppu}`;
    document.querySelector('span.total-order').textContent = `$${total}`;
  },
  updateSelectedList: ({ quantityPricing, optionGroups, optionsCostModifier }) => {
    const selectedOptionsList = document.querySelector('ul.selected-options-list');
    const selectedOptionsReferencesList = document.querySelector('ul.selected-options-references-list');
    selectedOptionsList.textContent = '';
    selectedOptionsReferencesList.textContent = '';
    const selectedQuantityLi = document.createElement('li');
    selectedQuantityLi.classList.add('selected-option-li');
    selectedQuantityLi.textContent = `quantity: $${quantityPricing.ppuDiff}`;
    selectedOptionsList.append(selectedQuantityLi);
    optionGroups.forEach((group) => {
      const optCostLi = document.createElement('li');
      optCostLi.classList.add('selected-option-li');
      optCostLi.textContent = `${group.groupName}: $${group.option.ppuDiff}`;
      selectedOptionsList.append(optCostLi);
      if (group.option.link) {
        const optLinkLi = document.createElement('li');
        optLinkLi.setAttribute('data-group', group.groupName);
        const anchor = document.createElement('a');
        anchor.setAttribute('href', group.option.link);
        anchor.textContent = group.option.optionName;
        anchor.classList.add('selected-option-link');
        optLinkLi.append(anchor);
        selectedOptionsReferencesList.append(optLinkLi);
      }
    });
    document.querySelector('.total-options-modifier').textContent =
      `$${Math.round((optionsCostModifier + quantityPricing.ppuDiff) * 100) / 100}`;
  },
  updateMenuSelection: ({ groupName, optionName, ppuDiff }, optionElements) => {
    document.querySelector(`input#${groupName}SelectedOption`).value = optionName;
    document.querySelector(`input#${groupName}SelectedOptionPpuDiff`).value = ppuDiff;
    document.querySelector(`button#${groupName}SelectToggle`).textContent = optionName;
    for (const optionElement of optionElements) {
      if (optionElement.textContent === optionName) optionElement.classList.add('selected-option');
      else optionElement.classList.remove('selected-option');
    }
  },
  updateAll: () => {
    const { quantityPricing, options, optionsCostModifier, ppu, total } = cache.getAllCurrent();
    viewManager.updateTotals({ quantity: quantityPricing.quantity, ppu, total, optionsCostModifier });
    viewManager.updateSelectedList({ quantityPricing, optionGroups: options, optionsCostModifier });
  },
};
