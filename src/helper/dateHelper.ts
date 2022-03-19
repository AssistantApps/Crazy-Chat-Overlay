const dayjs = require('dayjs');

export const formatDate = (date: Date, format: string = 'YYYY/MM/DD'): string => {
    try {
        return dayjs(date).format(format);
    }
    catch {
        return '';
    }
}
