export const state = {
  temporaryContent: 'Just a place holder to show content',
  longTermContent: [],
};

export const updateContent = function (contentData = state.temporaryContent) {
  state.temporaryContent = contentData;

  state.longTermContent.push({ time: Date.now(), content: contentData });
};
