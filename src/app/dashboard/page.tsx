import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardPage = async() => {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }
    
    const handleLogout = async () => {
        "use server"
        await signOut( { redirectTo: "/" } );        
    }

    return (
        <div className="flex items-center justify-items-center flex-col">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard , {session.user.name}!</p>
            <Image src={session.user.image ?? "@/../public/next.svg"} width={100} height={100} alt="Logo" className="mt-10 mb-10" />
            <p>Here you can manage your settings and view your data.</p>

            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 mt-10">
                <LogOutIcon className="h-4 w-4" />
                Logout
            </Button>            
        </div>
     );
}
 
export default DashboardPage;