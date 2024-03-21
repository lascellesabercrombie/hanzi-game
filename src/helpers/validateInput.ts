export const validateInput = (input: string) => {
    const chineseCharacterRegex = /^[\u4e00-\u9fa5]{0,1}$/
    const englishWordRegex = /^[a-zA-Z]+$/

    if (chineseCharacterRegex.test(input)) {
        return "chinese"
    }
    if (englishWordRegex.test(input)) {
        return "english"
    }
    return false
}