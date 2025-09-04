'use client'
import { useEffect, useState } from "react";
import { Insertlist, Loadinglist, Removelist } from "../../../utils/functionlists";
import { Lists, Tasks, Priority } from "../../../utils/interface";
import { faXmarkCircle, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Altertask, Insertask, Loadingtask, Removetask } from "../../../utils/functiontask";
import router from "next/router";
import Link from "next/link";

export default function Tarefas() {
    const [Modelist, setmodelist] = useState(false)
    const [Modetask, setmodetask] = useState(false)
    const [Moderecontent, setmoderecontent] = useState(false)
    const [Titlelist, settitlelist] = useState("")
    const [Listtask, setlisttask] = useState<Lists[]>([])
    const [Tasklist, settasklist] = useState<Tasks[]>([])
    const [ListId, setListid] = useState("")
    const [Titletask, settitletask] = useState("")
    const [Contenttask, setcontenttask] = useState("")
    const [Prioritytask, setprioritytask] = useState("")
    const [Newcontentask, setnewcontenttask] = useState("")
    const [Idtask, setidtask] = useState("")

    useEffect(() => {
        const uid = localStorage.getItem("uid")
        if (!uid) {
            router.push("/")
            return
        }

        const fetchlistandtasks = async () => {
            const listas = await Loadinglist()
            setlisttask(listas)

            const alltasks: Tasks[] = [];
            for (const lista of listas) {
                const tasks = await Loadingtask(lista.id)
                alltasks.push(...tasks)
            }
            settasklist(alltasks)
        }

        fetchlistandtasks()

    }, [router])

    return (
        <>
            {Modelist == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-36">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={(e) => { e.preventDefault(); Insertlist(Titlelist, settitlelist, setlisttask); setmodelist(false) }}>
                            <label className="text-white block font-bold">Titulo</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" type="text" value={Titlelist} onChange={(e) => settitlelist(e.target.value)} placeholder="Digite o titulo da lista de tarefas" />
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" >CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={() => setmodelist(false)}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <></>
            )}
            {Modetask == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={(e) => { e.preventDefault(); Insertask(ListId, Titletask, Contenttask, Prioritytask, settasklist, settitletask, setcontenttask, setprioritytask); setmodetask(false) }}>
                            <label className="text-white block font-bold">Titulo</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" type="text" value={Titletask} onChange={(e) => settitletask(e.target.value)} placeholder="Digite o titulo da tarefa" />
                            <label className="text-white block font-bold">Conteudo</label>
                            <textarea className="w-[99%] h-52 bg-white rounded-sm" cols={30} rows={10} placeholder="Digite o conteudo da sua tarefa" value={Contenttask} onChange={(e) => setcontenttask(e.target.value)} />
                            <label className="text-white block font-bold">Prioridade</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" value={Prioritytask} onChange={(e) => setprioritytask(e.target.value)} list="Prioridade" />
                            <datalist id="Prioridade">
                                {Priority.map((item) => (
                                    <option key={item.id} value={item.Priority}></option>
                                ))}
                            </datalist>
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" >CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => {e.preventDefault();setmodetask(false)}}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <></>
            )}
            {Moderecontent == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={(e) => {e.preventDefault(); Altertask(Idtask, ListId, Newcontentask, setnewcontenttask, settasklist); setmoderecontent(false)}}>
                            <label className="text-white block font-bold">Novo conteudo</label>
                            <textarea className="w-[99%] h-52 bg-white rounded-sm" cols={30} rows={10} placeholder="Digite o novo conteudo que substituira o antigo" value={Newcontentask} onChange={(e) => setnewcontenttask(e.target.value)} />
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" >CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => {e.preventDefault(); setmoderecontent(false)}}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <></>
            )}
            <header className="w-full h-10 bg-[#050505] items-center flex justify-between">
                <Link href={'/'}>
                    <h1 className="text-white font-extrabold text-2xl ml-3">DAILY LIFE</h1>
                </Link>
                <div className="space-x-3 mr-3">
                    <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-32 h-6 shadow-s2 font-black hover:scale-108" onClick={() => setmodelist(true)}>NEW LIST</button>
                </div>
            </header>
            <main className="w-full h-full flex justify-center mt-10">
                <section className="p-4 flex overflow-x-auto space-x-4 w-[90%] h-[80%] bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl">
                    {Listtask.length == 0 ? (
                        <p className="text-white">Sem Listas</p>
                    ) : (
                        Listtask.map((guardado, index) => (
                            <div key={index} className="w-[25%] h-[99%] bg-linear-to-bl from-[#000000] to-[#151515] shadow-s4 rounded-2xl p-4 shrink-0 flex-col space-y-4 overflow-y-auto">
                                <div className="flex justify-between">
                                    <h1 className="text-white uppercase">{guardado.Title}</h1>
                                    <div className="flex space-x-3">
                                        <FontAwesomeIcon className="text-2xl text-green-500 hover:text-green-700 cursor-pointer" icon={faPlus} onClick={(e) => { e.preventDefault(); setmodetask(true), setListid(guardado.id) }} />
                                        <FontAwesomeIcon className="text-2xl text-red-500 hover:text-red-700 cursor-pointer" icon={faXmarkCircle} onClick={(e) => { e.preventDefault(); Removelist(guardado.id, setlisttask) }} />
                                    </div>
                                </div>
                                {Tasklist.filter(task => task.listId === guardado.id).length === 0 ? (
                                    <p className="text-white">Sem Tarefas</p>
                                ) : (
                                    Tasklist.filter(task => task.listId === guardado.id).map((task, index) => (
                                        <div key={index} className="p-2 w-[99%] h-44 bg-linear-to-r from-[#F9D849] to-[#FFE883] rounded-sm shadow-s2 flex flex-col break-words">
                                            <p className="font-black text-2xl">{task.Title}</p>
                                            <div className="w-[100%] h-96 overflow-y-auto">
                                                <p className="text-xs whitespace-pre-wrap">{task.Content}</p>
                                            </div>
                                            <p className="font-black text-xs uppercase">Prioridade: <span className={task.Priority === "Extremo" ? "text-red-500" : task.Priority === "Médio" ? "text-yellow-500" : "text-green-500"}>{task.Priority}</span></p>
                                            <div className="h-full flex items-end">
                                                <FontAwesomeIcon className="text-2xl text-red-500 hover:text-red-700 cursor-pointer" icon={faXmarkCircle} onClick={(e) => { e.preventDefault(); Removetask(task.id, task.listId, settasklist) }} />
                                                <FontAwesomeIcon className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" icon={faPen} onClick={(e) => { e.preventDefault(); setmoderecontent(true), setidtask(task.id) }} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))
                    )}
                </section>
            </main >
        </>
    )
}