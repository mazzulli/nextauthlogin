import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";


export default async function Home(){
    const session = await auth();

    if( !session?.user ){
        redirect("/login");
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-xs mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-center mb-6">WELLCOME HOME PAGE!!</h1>                
            </div>                
        </div>
      );
}
 