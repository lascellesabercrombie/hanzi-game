import { test, expect } from '@playwright/test';

test('user can toggle pronunciation and definition', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL('http://localhost:3000/practice');
  await expect(page.getByTestId('span-pronunciation')).toHaveText('de');
  await expect(page.getByTestId('span-definition')).toHaveText('possessive, adjectival suffix');
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('http://localhost:3000/settings');
  await expect(page.getByLabel('Show definition')).toBeChecked();
  await expect(page.getByLabel('Show pronunciation')).toBeChecked();
  await page.getByLabel('Show definition').click();
  await expect(page.getByLabel('Show definition')).not.toBeChecked();
  await expect(page.getByLabel('Show pronunciation')).toBeChecked();
  await page.getByLabel('Show pronunciation (Mandarin)').click();
  await expect(page.getByLabel('Show definition')).not.toBeChecked();
  await expect(page.getByLabel('Show pronunciation (Mandarin)')).not.toBeChecked();
  await page.getByRole('link', { name: 'Practice' }).click();
  await expect(page).toHaveURL('http://localhost:3000/practice');
  await expect(page.getByTestId('span-pronunciation')).toBeHidden();
  await expect(page.getByTestId('span-definition')).toBeHidden();
});