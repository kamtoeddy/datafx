declare type UpdateByDeterminant = <T>(value: T, index: number, array: T[]) => T;
export declare const updateBy: <T>(list: T[], determinant: UpdateByDeterminant) => T[];
export {};
