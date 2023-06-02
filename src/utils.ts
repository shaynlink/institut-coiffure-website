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

export function timeConversion(duration: number): string {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    duration = duration - (hours * msInHour);
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    duration = duration - (minutes * msInMinute);
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  return portions.join(' ');
}
