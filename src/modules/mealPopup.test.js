/**
 * @jest-environment jsdom
 */
import MealPopup from './mealPopup.js';

const div = document.createElement('div');
div.id = 'comment-list';
document.body.appendChild(div);
const mealpopupNew = new MealPopup(null);

describe('CRUD operations', () => {
  test('Add meal comment', () => {
    const lastLength = div.childElementCount.length;
    mealpopupNew.showComment({
      item_id: 1,
      username: 'Chris',
      comment: 'Test comment.',
    });
    expect(div.childElementCount).toBe(lastLength + 1);
  });
});
