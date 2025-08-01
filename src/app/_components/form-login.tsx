"use client";

import { login } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

const FormLogin = () => {
    const handleCredentialSignIn = (formData: FormData) => {
        login(formData)
        // const email = formData.get("email") as string;
        // const password = formData.get("password") as string;
        
        // if (!email || !password) {
        //     throw new Error("Email e senha são obrigatórios.");
        // }

        // signIn("credentials", {email, password})

        // const user = signIn("credentials", { email, password });

        // console.log("USER DEPOIS DO LOGIN: ", user);

        // if (!user) {
        //     toast("Usuário ou senha inválido.");
        //     redirect("/login");
        // }

        // toast("Login realizado com sucesso!", {
        //     description: "Você será redirecionado em breve.",            
        // });
        
        redirect("/dashboard");        
    };

    return ( 
        <div>
            <form
                className="space-y-4"       
                action={handleCredentialSignIn}
            >                    
                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    autoComplete="email"
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    autoComplete="current-password"
                />
                <Button className="w-full" type="submit">
                    Access
                </Button>
            </form>    
        </div>
     );
}
 
export default FormLogin;