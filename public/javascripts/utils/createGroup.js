const createGroup = (groupName, { options = [], refs = null, abbr = true }) => {
  if (!groupName || groupName.length <= 0) throw new Error(`Invalid groupName: ${groupName}`);
  const group = { groupName };
  if (options.length > 0 && !refs) group.options = options;
  else if (refs) group.refs = refs;
  else throw new Error(`Options or Refs required`);
  return group;
};

export default createGroup;
