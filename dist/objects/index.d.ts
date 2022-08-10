import { ObjectType } from "../interfaces";
export * from "./getDifference";
export declare const assignDeep: (data: ObjectType, { key, value }: {
    key: string | string[];
    value: any;
}) => ObjectType;
export declare const cloneDeep: (data: any) => any;
export declare const getDeepValue: (data: ObjectType, key: string) => any;
export declare const getSubObject: (obj: ObjectType, sampleSub: ObjectType) => ObjectType;
export declare const hasDeepKey: (obj: ObjectType, key: string | string[]) => boolean;
export declare const removeDeep: (obj: ObjectType, key: string | string[]) => ObjectType;
export declare const setDeepValue: (data: ObjectType, { key, value }: {
    key: string;
    value: any;
}) => ObjectType;
