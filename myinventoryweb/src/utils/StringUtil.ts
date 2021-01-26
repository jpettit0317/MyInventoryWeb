

export function removeDoubleQuotesFromString(input: string): string {
    return input.replace(/"/g, "");
}