export const keysOf = <T extends object>(object: T) =>
    Object.keys(object) as (keyof T)[]

export const valuesOf = <T extends object>(object: T) =>
    Object.values(object) as T[keyof T][]

export const includes = <A extends unknown>(
    array: readonly A[],
    element: unknown
): element is A => array.includes(element as A)
