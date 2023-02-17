import genToken from '@shaynlink/gentoken';
import securityHeaders from '../securityHeaders';

export function classNames(...args: string[]): string {
    return args.join(' ');
}

export const classNameIcon: string = 'material-symbols-outlined';

export function CSPGenerator(): () => [string, string] {
    const generator: IterableIterator<string> = genToken();

    // generateCsp function
    return function generateCSP(): [string, string] {
        let csp = securityHeaders.find(({key}) => key == 'Content-Security-Policy')?.key;
        if (!csp) {
            csp = ''
        }

        return [
            csp,
            generator.next().value
        ];
    }
}
