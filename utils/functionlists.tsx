import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import { Lists } from "./interface"
import { db } from "../firebase"
import { SetStateAction } from "react"

export const Insertlist = async (
    Titlelist: string,
    settitlelist: React.Dispatch<React.SetStateAction<string>>,
    setlisttask: React.Dispatch<React.SetStateAction<Lists[]>>
) => {
    if (!Titlelist) {
        alert("Por favor digite um titulo")
        return null
    }

    const Newinsertlist: Omit<Lists, "id"> & {Data: any}= { //Omit serve para resolver o problema de colocar algum campo obrigatorio como o id
        Title: Titlelist,
        Data: serverTimestamp()
    }

    try {
        await addDoc(collection(db, "Lists"), Newinsertlist)
        const novalista = await Loadinglist()
        setlisttask(novalista)

        settitlelist("")
    } catch (error: any) {
        console.log("Error ao criar lista " + error)
    }
}

export const Removelist = async (
    id: string,
    setlisttask: React.Dispatch<React.SetStateAction<Lists[]>>
) => {
    if (!id) {
        alert("Lista não achada")
        return null
    }

    try{
        await deleteDoc(doc(db,"Lists", id))
        const novalista = await Loadinglist()
        setlisttask(novalista)
    }catch(error: any){
        console.log("Error ao apagar a lista " + error)
    }
}

export const Loadinglist = async () => {
    try {
        const q = query (collection(db, "Lists"), orderBy("Data", "asc"))
        const Listregister = await getDocs(q)
        const lista = Listregister.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lists[]
        return lista
    } catch (error: any) {
        console.log("Erro ao carregar lista" + error)
        return []
    }
}