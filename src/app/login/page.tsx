import { Separator } from "@/components/ui/separator";
import FormLogin from "../_components/form-login";
import AuthenticationButtos from "../_components/authentication-buttons";

export default function Home(){
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-xs mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-center mb-6">SSIT CONSULTING</h1>
                <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
                {/* Email/Password Sign In */}
                <FormLogin />
                <Separator className="my-6" />
                <p>Ou faça o login por um dos métodos abaixo</p>
            </div>                
            <AuthenticationButtos />
        </div>
      );
}
 