"use client"
import { useState } from "react";
import { Registeruser, Loginuser } from "../../utils/function";
import { useRouter } from "next/navigation";

export default function Home() {
  const [Email, setEmail] = useState("")
  const [Confemail, setConfemail] = useState("")
  const [Password, setPassword] = useState("")
  const [Confpassword, setConfpassword] = useState("")
  const [Mode, setMode] = useState(true)
  const router = useRouter()

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (Mode) {
      const res = await Registeruser(Email, Confemail, Password, Confpassword)
      if (res){
        localStorage.setItem("uid",res.uid)
        router.push('/Tarefas/')
      }
    } else {
      const res = await Loginuser(Email, Password)
      if (res) {
        localStorage.setItem("uid", res.uid)
        router.push('/Tarefas/')
      }
    }
  }

  return (
    <>
      <header className="w-full h-10 bg-[#050505] items-center flex">
        <h1 className="text-white font-extrabold text-2xl ml-3">DAILY LIFE</h1>
      </header>
      <main className="flex flex-col space-y-3 items-center justify-center w-full h-full">
        <div className="w-[20%] flex justify-between max-cell3:w-52">
          <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-black hover:scale-108" onClick={() => setMode(true)}>Register</button>
          <button className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-black hover:scale-108" onClick={() => setMode(false)}>Login</button>
        </div>
        {Mode == true ? (
          <div key="register" className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-96 max-cell3:w-52">
            <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={handlesubmit}>
              <label className="text-white block font-bold">E-mail</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu E-mail" />
              <label className="text-white block font-bold">Confirme e-mail</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Confemail} onChange={(e) => setConfemail(e.target.value)} type="email" placeholder="Confirme seu e-mail" />
              <label className="text-white block font-bold">Senha</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
              <label className="text-white block font-bold">Confirme senha</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Confpassword} onChange={(e) => setConfpassword(e.target.value)} type="password" placeholder="Confirme sua senha" />
              <div className="flex w-full justify-center mt-4">
                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108">Confirm</button>
              </div>
            </form>
          </div>
        ) : (
          <div key="login" className="scale bg-linear-to-bl from-[#000000] to-[#151515] shadow-s1 rounded-2xl w-[20%] h-56 max-cell3:w-52">
            <form className="w-full h-full p-4 space-y-2 flex flex-col" onSubmit={handlesubmit}>
              <label className="text-white block font-bold">E-mail</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu E-mail" />
              <label className="text-white block font-bold">Senha</label>
              <input className="w-[99%] h-7 bg-white rounded-sm" value={Password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
              <div className="flex w-full justify-center mt-4">
                <button type="submit" className="transition-all bg-linear-to-r from-[#F9D849] to-[#FFE883] cursor-pointer rounded-sm w-20 h-7 shadow-s2 font-bold hover:scale-108">Confirm</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
