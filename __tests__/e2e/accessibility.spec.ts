import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.describe('accessibility tests:', () => {
    test.describe('practice page', () => {
        test('should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('http://localhost:3000/practice');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    });
    test.describe('settings page', () => {
        test('should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('http://localhost:3000/settings');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    });
    test.describe('library page', () => {
        test('should not have any automatically detectable accessibility issues', async ({ page }) => {
            await page.goto('http://localhost:3000/library');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    });
})
