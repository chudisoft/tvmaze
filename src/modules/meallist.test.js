/**
 * @jest-environment jsdom
 */
import Meallist from './meallist.js';

const div = document.createElement('div');
div.id = 'meal-list';
document.body.appendChild(div);
const mealNew = new Meallist();
mealNew.renderMeallist();

const mealTest = {
  name: `Meal ${mealNew.getMeallist().length + 1}`,
  score: 0,
  index: mealNew.getMeallist().length + 1,
};

describe('CRUD operations', () => {
  test('Add meal', () => {
    const lastLength = mealNew.getMeallist().length;
    mealNew.likes(mealTest, true);
    expect(mealNew.getMeallist().length).toBe(lastLength + 1);
  });
});
