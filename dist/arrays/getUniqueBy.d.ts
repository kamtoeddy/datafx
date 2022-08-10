declare type GetUniqueByOptions = {
    backwards?: boolean;
};
export declare const getUniqueBy: <T>(list: T[], key?: string, { backwards }?: GetUniqueByOptions) => T[];
export {};
