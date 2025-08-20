import { addDoc, collection, getDocs } from "firebase/firestore"
import { Lists } from "./interface"
import { db } from "../firebase"

export const Insertlist = async (
    Titlelist: string,
    settitlelist: React.Dispatch<React.SetStateAction<string>>,
    setlisttask: React.Dispatch<React.SetStateAction<Lists[]>>
 ) => {
    if (!Titlelist) {
        alert("Por favor digite um titulo")
        return null
    }

    const Newinsertlist: Lists = {
        Title: Titlelist
    }

    try {
        await addDoc(collection(db, "Lists"), Newinsertlist)
        const novalista = await Loadinglist()
        setlisttask(novalista)

        settitlelist("")
    } catch (error: any) {
        console.log("Error ao criar lista" + error)
    }
}

export const Loadinglist = async () => {
    try {
        const Listregister = await getDocs(collection(db, "Lists"))
        const lista = Listregister.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lists[]
        return lista
    } catch (error: any) {
        console.log("Erro ao carregar lista" + error)
        return []
    }
}