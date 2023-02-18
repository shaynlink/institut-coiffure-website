export function classNames(...args: string[]): string {
    return args.join(' ');
}

export const classNameIcon: string = 'material-symbols-outlined';

export interface ObjectInterface {
    [key: string | number | symbol]: any
}

export function removeProperties(obj: ObjectInterface, ...properties: string[]): ObjectInterface {
    const entries = Object.entries(obj);

    for (const property of properties) {
        const index = entries.findIndex(([key]) => key == property);
        if (index == -1) continue;
        entries.splice(index, 1);
    }

    return Object.fromEntries(entries);
}
