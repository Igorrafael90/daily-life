import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
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
            [...prev, { ...Newinserttask, id: docref.id }]//para o carregamento sem que haja ler todas as tasks fazendo o problema de recarregar a pagina para resolver
        );

        settitletask("")
        setcontenttask("")
    } catch (error: any) {
        alert("Não foi possível cadastra a tarefa" + error)
    }
}

export const Removetask = async(
    id: string,
    listId: string,
    settasklist: React.Dispatch<React.SetStateAction<Tasks[]>>
) => {
    if(!id){
        alert("Tarefa não encontrada")
        return null
    }

    try{
        await deleteDoc(doc(db, "Listas", listId, "Tasks", id))
        settasklist(prev => prev.filter(task => task.id !== id)) //versão mais rapida que ao invés de puxar tudo para apagar apenas uma, filtra ela
    }catch(error: any){
        alert("Não foi possível apagar a tarefa")
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