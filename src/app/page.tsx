"use client"
import { useState } from "react";

export default function Home() {
  const [Email, setEmail] = useState("")
  const [Conemail, setConemail] = useState("")
  const [Password, setPassword] = useState("")
  const [Conpassword, setConpassword] = useState("")
  const [Mode, setMode] = useState(true)

  return (
    <main className="flex flex-col space-y-3 items-center justify-center w-full h-full">
      <div className="w-[20%] flex justify-between">
        <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" onClick={() => setMode(true)}>Login</button>
        <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108" onClick={() => setMode(false)}>Register</button>
      </div>
      {Mode == true ? (
        <div key="login" className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-96">
          <form className="w-full h-full p-4 space-y-2 flex flex-col" action="">
            <label className="text-white block font-bold">E-mail</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Digite seu E-mail" />
            <label className="text-white block font-bold">Confirme e-mail</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Conemail} onChange={(e) => setConemail(e.target.value)} type="text" placeholder="Confirme seu e-mail" />
            <label className="text-white block font-bold">Senha</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Digite sua senha" />
            <label className="text-white block font-bold">Confirme senha</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Conpassword} onChange={(e) => setConpassword(e.target.value)} type="text" placeholder="Confirme sua senha" />
            <div className="flex w-full justify-center mt-4">
              <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108">Confirm</button>
            </div>
          </form>
        </div>
      ) : (
        <div key="register" className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-56">
          <form className="w-full h-full p-4 space-y-2 flex flex-col" action="">
            <label className="text-white block font-bold">E-mail</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Digite seu E-mail" />
            <label className="text-white block font-bold">Senha</label>
            <input className="w-[99%] h-7 bg-white rounded-sm" value={Password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Digite sua senha" />
            <div className="flex w-full justify-center mt-4">
              <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108">Confirm</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
