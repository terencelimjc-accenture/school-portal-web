export const commonInputRegex = new RegExp(
    '^[\\w\\-\\s]+$'
);

export const contactNumberRegex = new RegExp(
    '^[689]\\d{7}$'
);

export const emailRegex = new RegExp(
    '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
);