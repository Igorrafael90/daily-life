'use client'
import { useState } from "react";

export default function Tarefas() {
    const [Modelist, setmodelist] = useState(false)
    return (
        <>
            {Modelist == true ? (
                <section className="w-full h-full absolute bg-[#000000ad] flex items-center justify-center">
                    <div className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-36">
                        <form className="w-full h-full p-4 space-y-2 flex flex-col">
                            <label className="text-white block font-bold">Titulo</label>
                            <input className="w-[99%] h-7 bg-white rounded-sm" type="text" placeholder="Digite o titulo da tarefa" />
                            <div className="w-full flex justify-between">
                                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108">CONFIRM</button>
                                <button type="submit" className="transition-all bg-linear-to-r from-[#f94949] to-[#ff8383] cursor-pointer rounded-sm w-20 h-7 shadow-s3 font-bold hover:scale-108" onClick={() => setmodelist(false)}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : (
                <>
                </>
            )}
            <header className="w-full h-10 bg-[#050505] items-center flex justify-between">
                <h1 className="text-white font-extrabold text-2xl ml-3">DAILY LIFE</h1>
                <div className="space-x-3 mr-3">
                    <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-32 h-6 shadow-s2 font-black hover:scale-108" onClick={() => setmodelist(true)}>NEW LIST</button>
                </div>
            </header>
            <main className="w-full h-full flex justify-center mt-10">
                <section className="w-[90%] h-[80%] bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl">

                </section>
            </main>
        </>
    )
}