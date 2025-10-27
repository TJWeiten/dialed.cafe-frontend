export type FormSchema<T> = {
    [K in keyof T]: (value: FormDataEntryValue | null) => T[K];
};

export function parseFormData<T extends Record<string, any>>(
    formData: FormData,
    schema: FormSchema<T>,
): T {
    const result = {} as T;

    for (const [key, parser] of Object.entries(schema)) {
        result[key as keyof T] = parser(formData.get(key));
    }

    return result;
}
