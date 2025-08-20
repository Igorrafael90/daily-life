import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export const Registeruser = async (
    Email: string,
    Confemail: string,
    Password: string,
    Confpassword: string,
) => {

    if (!Email || !Confemail || !Password || !Confpassword) {
        alert("Preencha todos os campos")
        return null
    }

    if (Email != Confemail) {
        alert("Os emails estão diferentes")
        return null
    }

    if (Password != Confpassword) {
        alert("As senhas estão diferentes")
        return null
    }

    if (Password.length < 8) {
        alert("A senha precisa ter pelo menos 6 caracteres")
        return null
    }

    if (!Email.includes("@")) {
        alert("O email é invalido")
        return null
    }

    try {
        await createUserWithEmailAndPassword(auth, Email.toLowerCase().trim(), Password)
        alert("Usuario cadastrado")
        return { user: Email.toLowerCase().trim(), password: Password }
    } catch (error: any) {
        alert("Error ao cadastrar " + error.message)
        return null
    }


}

export const Loginuser = async (
    Email: string,
    Password: string
) => {
    if (!Email || !Password) {
        alert("Preencha todos os campos")
        return null
    }

    try {
        await signInWithEmailAndPassword(auth, Email.toLowerCase().trim(), Password)
        return { user: Email.toLowerCase().trim(), password: Password }
    } catch (error: any) {
        alert("Error ao logar" + error.message)
        return null
    }
}