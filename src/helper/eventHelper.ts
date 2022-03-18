export const getValue = (e: any): string | null => {
    return e?.target?.value ?? null;
}