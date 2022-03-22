export const copyToClipboard = (content: string): boolean => {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return false;
    }

    try {
        navigator.clipboard.writeText(content);
        return true;
    }
    catch (e: any) {
        return false;
    }
}