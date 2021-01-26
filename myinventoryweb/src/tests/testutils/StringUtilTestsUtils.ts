
export function verifyDoubleQuotesDoNotExist(strings: string[]) {
    const [actualResult, expectedResult] = strings;
    
    expect(actualResult).toBe(expectedResult);
}