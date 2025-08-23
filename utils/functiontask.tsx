import { addDoc, collection, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { Tasks } from "./interface";
import { db } from "../firebase";

export const Insertask = async (
    listId: string,
    Titletask: string,
    Contenttask: string,
    settasklist: React.Dispatch<React.SetStateAction<Tasks[]>>,
    settitletask: React.Dispatch<React.SetStateAction<string>>,
    setcontenttask: React.Dispatch<React.SetStateAction<string>>
) => {
    if (!Titletask || !Contenttask) {
        alert("Preencha todos os campos")
    }

    const Newinserttask: Omit<Tasks, "id"> & { Data: any } = {
        Title: Titletask,
        Content: Contenttask,
        Data: serverTimestamp(),
        listId: listId
    }

    try {
        const docref = await addDoc(collection(db, "Listas", listId, "Tasks"), Newinserttask)
        settasklist(prev =>
            [...prev, { ...Newinserttask, id: docref.id }]
        );

        settitletask("")
        setcontenttask("")
    } catch (error: any) {
        alert("Não foi possível cadastra a tarefa" + error)
    }
}

export const Loadingtask = async (
    lisId: string
) => {
    try {
        const q = query(collection(db, "Listas", lisId, "Tasks"), orderBy("Data", "asc"))
        const Taskregister = await getDocs(q)
        const lista = Taskregister.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Tasks[]
        return lista
    } catch (error: any) {
        alert("Erro ao carregar as tarefas" + error)
        return []
    }
}