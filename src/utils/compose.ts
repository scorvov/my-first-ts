export const compose = (...funcs:any) => (comp:any) => {
    return funcs.reduceRight(
        (wrapped:any, f:any):void => f(wrapped), comp);
};
