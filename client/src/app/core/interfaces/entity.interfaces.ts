// export class Entity {
//     // [x: string]: any;
//     // id: number;
//     _id: string;
//     displayName: string;
//     pluralName: string;
//     uniqueName: string;
//     description?: string;

//     constructor(values: Object = {}) {
//         Object.assign(this, values);
//     }
// }

export interface Entity {
    _id: string;
    displayName: string;
    pluralName: string;
    uniqueName: string;
    description?: string;
    fields: EntityField[];
}

export interface EntityField {
    displayName: string;
    // pluralName: string;
    uniqueName: string;
    description?: string;
    type: EntityFieldTypeOptions;
    typeDetails: SingleLineOfText | MultipleLineOfText | WholeNumber | DecimalNumber | Currency | DateAndTime;
}

export interface SingleLineOfText {
    // fieldType: FieldType;
    format: string;
    maxLength: number;
}

export interface MultipleLineOfText {
    // fieldType: FieldType;
    maxLength: number;
}

export interface WholeNumber {
    // fieldType: FieldType;
    // format: string;
    minValue: number;
    maxValue: number;
}

export interface DecimalNumber {
    // fieldType: FieldType;
    precision: number;
    minValue: number;
    maxValue: number;
}

export interface Currency {
    // fieldType: FieldType;
    precision: number;
    minValue: number;
    maxValue: number;
}

export interface DateAndTime {
    // fieldType: FieldType;
    behavior: 'user-local'; // string literal type
    format: DateTimeFormat;
}

// export enum FieldType {
//     SIMPLE = 'simple',
//     CALCULATED = 'calculated',
//     ROLLUP = 'rollup',
// }
// export type FieldType = 'simple' | 'calculated' | 'rollup'; // string literal (shorter than enum but no intellisense)

export enum DateTimeFormat {
    DATE_ONLY = 'date-only',
    DATE_AND_TIME = 'date-and-time',
}
// export type DateTimeFormat = 'date-only' | 'date-and-time';

export enum SingleLineOfTextFormatOptions {
    TEXT = 'text',
    TEXT_AREA = 'text-area',
    EMAIL = 'email',
    URL = 'url',
    PHONE = 'phone',
}

export enum EntityFieldTypeOptions {
    SINGLE_LINE_OF_TEXT = 'single-line-of-text',
    MULTIPLE_LINES_OF_TEXT = 'multiple-lines-of-text',
    WHOLE_NUMBER = 'whole-number',
    DECIMAL_NUMBER = 'decimal-number',
    CURRENCY = 'currency',
    DATE_AND_TIME = 'date-and-time',
}

// export enum WholeNumberFormatOptions {
//     NONE = 'none',
//     TEXT_AREA = 'text-area',
//     EMAIL = 'email',
//     URL = 'url',
//     PHONE = 'phone',
// }
