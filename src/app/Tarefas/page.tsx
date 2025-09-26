'use client'
import { useEffect, useState } from "react";
import { Insertlist, Loadinglist, Removelist } from "../../../utils/functionlists";
import { Lists, Tasks, Priority } from "../../../utils/interface";
import { faXmarkCircle, faPlus, faPen, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Altertask, Insertask, Loadingtask, Removetask } from "../../../utils/functiontask";
import router from "next/router";
import Link from "next/link";
import { ExportPDF } from "../../../utils/functionfile";

export default function Tarefas() {
    const [Modelist, setmodelist] = useState(false)
    const [Modetask, setmodetask] = useState(false)
    const [Moderecontent, setmoderecontent] = useState(false)
    const [Conflist, setconflist] = useState(false)
    const [Conftask, setconftask] = useState(false)
    const [Titlelist, settitlelist] = useState("")
    const [Listtask, setlisttask] = useState<Lists[]>([])
    const [Tasklist, settasklist] = useState<Tasks[]>([])
    const [ListId, setListid] = useState("")
    const [Titletask, settitletask] = useState("")
    const [Contenttask, setcontenttask] = useState("")
    const [Prioritytask, setprioritytask] = useState("")
    const [Newcontentask, setnewcontenttask] = useState("")
    const [Newtitletask, setnewtitletask] = useState("")
    const [Newprioritytask, setnewprioritytask] = useState("")
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
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-36 max-cell3:w-52">
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
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto max-cell3:w-80">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={(e) => { e.preventDefault(); Insertask(ListId, Titletask, Contenttask, Prioritytask, settasklist, settitletask, setcontenttask, setprioritytask); setmodetask(false) }}>
                            <label className="text-white block font-bold">Titulo</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" type="text" value={Titletask} onChange={(e) => settitletask(e.target.value)} placeholder="Digite o titulo da tarefa" />
                            <label className="text-white block font-bold">Conteudo</label>
                            <textarea className="w-[99%] h-52 bg-white rounded-sm" cols={30} rows={10} placeholder="Digite o conteudo da sua tarefa" value={Contenttask} onChange={(e) => setcontenttask(e.target.value)} />
                            <label className="text-white block font-bold">Prioridade</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" value={Prioritytask} onChange={(e) => setprioritytask(e.target.value)} list="Prioridade" />
                            <datalist id="Prioridade">
                                {Priority.map((item) => (
                                    <option key={item.id} value={item.Priority} />
                                ))}
                            </datalist>
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" >CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); setmodetask(false) }}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <></>
            )}
            {Moderecontent == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto max-cell3:w-80">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={(e) => { e.preventDefault(); Altertask(Idtask, ListId, Newtitletask, Newcontentask, Newprioritytask, setnewtitletask, setnewcontenttask, setnewprioritytask, settasklist); setmoderecontent(false) }}>
                            <label className="text-white block font-bold">Novo Titulo</label>
                            <input type="text" className="w-[99%] h-7 bg-white rounded-sm" placeholder="Digite o novo titulo" value={Newtitletask} onChange={(e) => setnewtitletask(e.target.value)} />
                            <label className="text-white block font-bold">Novo conteudo</label>
                            <textarea className="w-[99%] h-52 bg-white rounded-sm" cols={30} rows={10} placeholder="Digite o novo conteudo que substituira o antigo" value={Newcontentask} onChange={(e) => setnewcontenttask(e.target.value)} />
                            <label className="text-white block font-bold">Nova prioridade</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" value={Newprioritytask} onChange={(e) => setnewprioritytask(e.target.value)} list="novaprioridade" />
                            <datalist id="novaprioridade">
                                {Priority.map((item) => (
                                    <option key={item.id} value={item.Priority} />
                                ))}
                            </datalist>
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" >CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); setmoderecontent(false) }}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <></>
            )}
            {Conflist == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto p-4 space-y-5 max-cell3:w-52">
                        <h1 className="text-white text-xl text-center">Tem certeza que quer apagar a lista</h1>
                        <div className="w-full flex justify-between">
                            <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); Removelist(ListId, setlisttask), setconflist(false) }}>CONFIRM</button>
                            <button className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); setconflist(false) }}>CANCEL</button>
                        </div>
                    </div>
                </section>
            ) : (
                <></>
            )}
            {Conftask == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center indent-px">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[30%] h-auto p-4 space-y-5 max-cell3:w-52">
                        <h1 className="text-white text-xl text-center">Tem certeza que quer apagar essa tarefa</h1>
                        <div className="w-full flex justify-between">
                            <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); Removetask(Idtask, ListId, settasklist), setconftask(false) }}>CONFIRM</button>
                            <button className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={(e) => { e.preventDefault(); setconftask(false) }}>CANCEL</button>
                        </div>
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
            <main className="w-full h-full flex items-center mt-5 flex-col space-y-2">
                <section className="w-[90%] flex">
                    <FontAwesomeIcon className="text-2xl text-white hover:text-gray-300 cursor-pointer" icon={faFile} onClick={() => ExportPDF(Listtask, Tasklist)}/>
                </section>
                <section className="p-4 flex overflow-x-auto space-x-4 w-[90%] h-[80%] bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl">
                    {Listtask.length == 0 ? (
                        <p className="text-white">Sem Listas</p>
                    ) : (
                        Listtask.map((guardado, index) => (
                            <div key={index} className="w-[25%] h-[99%] bg-linear-to-bl from-[#000000] to-[#151515] shadow-s4 rounded-2xl p-4 shrink-0 flex-col space-y-4 overflow-y-auto max-cell3:w-72">
                                <div className="flex justify-between">
                                    <h1 className="text-white uppercase">{guardado.Title}</h1>
                                    <div className="flex space-x-3">
                                        <FontAwesomeIcon className="text-2xl text-green-500 hover:text-green-700 cursor-pointer" icon={faPlus} onClick={(e) => { e.preventDefault(); setmodetask(true), setListid(guardado.id) }} />
                                        <FontAwesomeIcon className="text-2xl text-red-500 hover:text-red-700 cursor-pointer" icon={faXmarkCircle} onClick={(e) => { e.preventDefault(); setListid(guardado.id), setconflist(true) }} />
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
                                                <FontAwesomeIcon className="text-2xl text-red-500 hover:text-red-700 cursor-pointer" icon={faXmarkCircle} onClick={(e) => { e.preventDefault(); setListid(task.listId), setidtask(task.id), setconftask(true) }} />
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