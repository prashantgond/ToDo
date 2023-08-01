import {TaskItems} from '../types/types';

export const createListData = (listData: TaskItems[]) => {
  const sections = [];
  //   console.log('listData.......', listData);

  for (const task of listData) {
    const firstLetter = task.taskName[0].toUpperCase();

    const sectionIndex = sections.findIndex(
      section => section.title === firstLetter,
    );

    if (sectionIndex !== -1) {
      sections[sectionIndex].data.push({taskName: task.taskName, id: task.id});
    } else {
      sections.push({
        title: firstLetter,
        data: [{taskName: task.taskName, id: task.id}],
      });
    }
  }
  //   console.log('sections......', sections);
  return sections;
};
