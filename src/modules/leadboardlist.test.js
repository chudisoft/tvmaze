/**
 * @jest-environment jsdom
 */
import LeadboardList from './leadboardlist.js';

const div = document.createElement('div');
div.id = 'tvmaze';
document.body.appendChild(div);
const leadboardNew = new LeadboardList();
leadboardNew.renderLeadboardList();

const leadboardTest = {
  name: `Leadboard ${leadboardNew.getLeadboardList().length + 1}`,
  score: 0,
  index: leadboardNew.getLeadboardList().length + 1,
};
const leadboardTestList = [
  {
    name: `Leadboard ${leadboardNew.getLeadboardList().length + 2}`,
    score: 30,
    index: leadboardNew.getLeadboardList().length + 2,
  },
  {
    name: `Leadboard ${leadboardNew.getLeadboardList().length + 3}`,
    score: 20,
    index: leadboardNew.getLeadboardList().length + 3,
  },
  {
    name: `Leadboard ${leadboardNew.getLeadboardList().length + 4}`,
    score: 10,
    index: leadboardNew.getLeadboardList().length + 4,
  },
];

describe('CRUD operations', () => {
  test('Add leadboard', () => {
    const lastLength = leadboardNew.getLeadboardList().length;
    leadboardNew.addLeadboard(leadboardTest, true);
    leadboardNew.saveData();
    expect(leadboardNew.getLeadboardList().length).toBe(lastLength + 1);
  });

  test('Edit leadboard', () => {
    const index = 0;
    const newDescription = `Updated Leadboard ${index + 1}`;
    const leadboardEdited = {
      description: newDescription,
      completed: true,
      index: index + 1,
    };
    leadboardNew.updateLeadboard(leadboardEdited);
    expect(leadboardNew.getLeadboardList()[0].description).toBe(newDescription);
  });

  test('Update completed leadboard', () => {
    // Add 3 mock leadboards
    leadboardTestList.forEach((x) => {
      leadboardNew.addLeadboard(x, true);
    });
    const prevCompletedValue = leadboardNew.getLeadboardList()[1].completed;
    // Mark as completed 2 leadboards
    for (let index = 1; index < 2; index += 1) {
      const element = leadboardNew.getLeadboardList()[index];
      element.completed = true;
      leadboardNew.updateLeadboard(element);
    }

    expect(leadboardNew.getLeadboardList()[1].completed).toBe(!prevCompletedValue);
  });

  test('Clear completed leadboard', () => {
    // Clear completed leadboards
    leadboardNew.clearCompleted();
    expect(leadboardNew.getLeadboardList().length).toBe(2);
  });

  test('Delete leadboard', () => {
    const lastLength = leadboardNew.getLeadboardList().length;
    leadboardNew.removeLeadboard(leadboardNew.getLeadboardList()[0]);
    expect(leadboardNew.getLeadboardList().length).toBe(lastLength - 1);
  });
});
