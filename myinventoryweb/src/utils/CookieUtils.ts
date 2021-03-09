
export default function getCookieValue(fieldName: string): string | null {
    let re = new RegExp(fieldName + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null; 
}