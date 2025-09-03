export interface Lists {
    id: string,
    Title: string
}

export interface Tasks {
    id: string,
    Title: string,
    Content: string,
    listId: string,
    Data: any,
    Priority: string
}

export const Priority = [
    {
        id: 1,
        Priority: 'Normal'
    },
    {
        id: 2,
        Priority: 'Médio'
    },
    {
        id: 3,
        Priority: 'Extremo'
    },
]