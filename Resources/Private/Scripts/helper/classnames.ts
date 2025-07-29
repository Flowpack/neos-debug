export function classnames(...args: (string | boolean | undefined | null)[]): string {
    return args.filter(Boolean).join(' ');
}
