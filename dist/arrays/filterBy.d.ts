declare type FilterByOptions = {
    exclude?: boolean;
};
declare type Fx = <T>(list: T[], determinant: any, options?: FilterByOptions) => T[];
export declare const filterBy: Fx;
export {};
