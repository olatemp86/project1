export interface InvoicesForBulkPaymentsState {
    readonly loading: boolean
    readonly data?: any
    prevCursor: string;
    nextCursor: string;
    total: number;
    currentPageIndex: number;
    currentPageSize: number;
    keyword: string;
}

export enum InvoicesForBulkPaymentsListActionType {
    SET_INVOICES_FOR_BULK_PAYMENTS_LOADING = 'SET_INVOICES_FOR_BULK_PAYMENTS_LOADING',
    SET_INVOICES_FOR_BULK_PAYMENTS = 'SET_INVOICES_FOR_BULK_PAYMENTS',
    SET_PREVIOUS_INVOICES_FOR_BULK_PAYMENTS_CURSOR = 'SET_PREVIOUS_INVOICES_FOR_BULK_PAYMENTS_CURSOR',
    SET_NEXT_INVOICES_FOR_BULK_PAYMENTS_CURSOR = 'SET_NEXT_INVOICES_FOR_BULK_PAYMENTS_CURSOR',
    SET_INVOICES_FOR_BULK_PAYMENTS_TOTAL = 'SET_INVOICES_FOR_BULK_PAYMENTS_TOTAL',
    SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_INDEX = 'SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_INDEX',
    SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_SIZE = 'SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_SIZE',
    SET_INVOICES_FOR_BULK_PAYMENTS_SEARCH_KEYWORD = 'SET_INVOICES_FOR_BULK_PAYMENTS_SEARCH_KEYWORD',
}
