import { test, expect } from '@playwright/test';

test('user can search (English definition), add, and delete character from practice page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Library' }).click();
  await expect(page).toHaveURL('http://localhost:3000/library');
  await expect(page.getByTestId('div-character-grid')).not.toContainText('中')
  await page.getByRole('button', { name: 'Add character to library' }).click();
  await page.getByTestId('input-search').fill('middle');
  await page.getByTestId('input-search').press('Enter');
  await page.getByRole('button').filter({ hasText: '中' }).click();
  await expect(page.getByTestId('div-character-grid')).toContainText('中')
  await page.getByRole('button', { name: '中' }).click();
  await expect(page).toHaveURL('http://localhost:3000/practice');
  await page.getByTestId('button-remove-character').click()
  await page.getByTestId('button-confirm').click()
  await page.getByRole('link', { name: 'Library' }).click();
  await expect(page).toHaveURL('http://localhost:3000/library');
  await expect(page.getByTestId('div-character-grid')).not.toContainText('中')
});

test('user can select and delete multiple characters; reloading brings them back', async ({ page }) => {
  await page.goto('http://localhost:3000/library');
  const characterButton = page.locator('.grid > button');
  await expect(characterButton).toHaveCount(5);
  await page.getByTestId('button-select').click();
  for (const button of await characterButton.all())
    await button.click();
  await page.getByTestId('button-remove-multiple-characters').click();
  await page.getByTestId('button-confirm').click();
  await expect(characterButton).toHaveCount(0);
  await page.reload()
  await expect(characterButton).toHaveCount(5);
});