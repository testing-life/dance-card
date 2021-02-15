export const isObjectWithValue = <T>(obj: T, prop: string) => Object.keys(obj).includes(prop);

export const getFilteredKeys = <T, K extends keyof T>(obj: T, property:K):string[] => Object.entries(obj).filter((item:any[]) => item[1][property]).map((item:any[]) => item[0]);