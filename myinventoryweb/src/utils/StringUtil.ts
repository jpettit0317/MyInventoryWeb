

export function removeDoubleQuotesFromString(input: string): string {
    return input.replace(/"/g, "");
}

export function isStringNotANumber(input: string): boolean {
    return typeof input !== "number" || Number.isNaN(input);
}