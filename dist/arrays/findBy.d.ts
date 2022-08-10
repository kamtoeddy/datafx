declare type FindByOptions = {
    fromBack?: boolean;
};
declare type Fx = <T>(list: T[], determinant: any, options?: FindByOptions) => T | undefined;
export declare const findBy: Fx;
export {};
