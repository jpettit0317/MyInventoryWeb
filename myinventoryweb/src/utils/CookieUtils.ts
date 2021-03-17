
export default function getCookieValue(fieldName: string): string | null {
    let re = new RegExp(fieldName + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null; 
}

export function deleteCookie(fieldName: string) {
    const deleteString = '=; Max-Age=0';

    document.cookie = fieldName + deleteString;
}