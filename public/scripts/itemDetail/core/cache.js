export const cache = {
  basePpu: -Infinity,
  selected: {
    quantityPricing: {},
    options: [],
  },
  setBasePpu: (basePpu) => (cache.basePpu = +basePpu),
  addCachedOptionGroup: (groupName, selectedOption) =>
    cache.selected.options.push({ groupName, option: { ...selectedOption } }),
  // updates (overwrites) cached data
  updateSelectedQuantityPricing: (quantity, ppuDiff) => (cache.selected.quantityPricing = { quantity, ppuDiff }),
  updateSelectedOption: (groupName, optionName, ppuDiff, link) =>
    (cache.selected.options = cache.selected.options.map((group) =>
      group.groupName === groupName ? { ...group, option: { optionName, ppuDiff, link } } : group
    )),
  // returns parsed cached data (String -> Number)
  getSelectedQuantityPricing: () => ({
    quantity: +cache.selected.quantityPricing.quantity,
    ppuDiff: +cache.selected.quantityPricing.ppuDiff,
  }),
  getSelectedOptions: () =>
    cache.selected.options.map((selected) => ({
      ...selected,
      option: { optionName: selected.option.optionName, ppuDiff: +selected.option.ppuDiff, link: selected.option.link },
    })),
  // returns the sum of all the selected option's cost modifiers
  getCurrentOptionsCostModifier: () =>
    Math.round(cache.getSelectedOptions().reduce((acc, curr) => (acc += curr.option.ppuDiff), 0) * 100) / 100,
  // returns the current ppu based on options
  getCurrentPpu: () => {
    const { ppuDiff } = cache.getSelectedQuantityPricing();
    const totalOptionCostModifier = cache.getCurrentOptionsCostModifier();
    return Math.round((cache.basePpu + ppuDiff + totalOptionCostModifier) * 100) / 100;
  },
  // returns the total of the order
  getCurrentTotal: () => {
    const currentPpu = cache.getCurrentPpu();
    const { quantity } = cache.getSelectedQuantityPricing();
    return Math.round(currentPpu * quantity * 100) / 100;
  },
  // return all current properties
  getAllCurrent: () => ({
    quantityPricing: cache.getSelectedQuantityPricing(),
    options: cache.getSelectedOptions(),
    optionsCostModifier: cache.getCurrentOptionsCostModifier(),
    ppu: cache.getCurrentPpu(),
    total: cache.getCurrentTotal(),
  }),
};
