export function ucFirst(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatValue(value: any): string {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    if (typeof value === 'object') {
        return syntaxHighlight(value);
    }

    return value;
}

export function syntaxHighlight(json: string | object): string {
    if (typeof json != 'string') {
        try {
            json = JSON.stringify(json, undefined, 2);
        } catch (e) {
            console.error('Failed to stringify JSON:', e);
            return 'Invalid JSON';
        }
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        function (match: string) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        },
    );
}
