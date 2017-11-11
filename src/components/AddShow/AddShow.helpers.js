export const getButtonText = numOfShowsSelected => {
  switch (numOfShowsSelected) {
    case 0:
      return 'No shows selected';
    case 1:
      return 'Add show';
    default:
      return `Add ${numOfShowsSelected} shows`;
  }
};
