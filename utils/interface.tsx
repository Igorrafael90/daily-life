export interface Lists {
    id: string,
    Title: string
}

export interface Tasks {
    id: string,
    Title: string,
    Content: string,
    listId: string,
    Data: any
}