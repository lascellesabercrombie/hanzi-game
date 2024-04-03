import '@testing-library/jest-dom'
import { validateInput } from '../../src/helpers/validateInput'

describe('Library', () => {
    describe('Search', () => {
        it('rejects multiple Chinese characters', () => {
            const input = '中文'
            const expected = false
            expect(validateInput(input)).toEqual(expected)
        })
        it('rejects input with space', () => {
            const input = 'c at'
            const expected = false
            expect(validateInput(input)).toEqual(expected)
        })
        it('rejects scripts that are neither Chinese nor Latin', () => {
            const input = 'じゃぱねせ'
            const expected = false
            expect(validateInput(input)).toEqual(expected)
        })
        it('returns "english" for multiple Latin characters without space', () => {
            const input = 'cat'
            const expected = "english"
            expect(validateInput(input)).toEqual(expected)
        })
        it('accepts a single Chinese character', () => {
            const input = '中'
            const expected = "chinese"
            expect(validateInput(input)).toEqual(expected)
        })
    })
})