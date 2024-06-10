/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Settings from '../../src/app/settings/page'
import { handleToggleSetting } from '@/src/helpers/handleToggleSetting';
import { localStorageMock } from './mocks/localStorageMock';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Settings', () => {
  it('renders a heading', () => {
    render(<Settings />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
  describe('handleToggleSetting', () => {
    let setStateMock: jest.Mock;

    beforeEach(() => {
      setStateMock = jest.fn();
      localStorage.clear();
    });

    it('given state "false" sets state and local storage to "true"', () => {
      const name = 'testSetting';
      const initialState = false;

      handleToggleSetting(name, initialState, setStateMock);

      expect(setStateMock).toHaveBeenCalledWith(true);
      expect(localStorage.getItem(name)).toBe('true');
    });

    it('given state "true" sets state and local storage to "false"', () => {
      const name = 'testSetting';
      const initialState = true;

      handleToggleSetting(name, initialState, setStateMock);

      expect(setStateMock).toHaveBeenCalledWith(false);
      expect(localStorage.getItem(name)).toBe('false');
    });
  });
})