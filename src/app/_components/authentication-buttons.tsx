import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Github, MailCheck, MailOpen } from "lucide-react";
import { IconBrandGithub, IconBrandGoogle, IconBrandMeta } from "@tabler/icons-react";

export default async function AuthenticationButtos() {  
  const handleLoginGitHub = async () => {
    "use server"    
    await signIn("github", {
      redirectTo: "/dashboard",
    });
  };

  const handleLoginGoogle = async () => {
    "use server"    
    await signIn("google", {
      redirectTo: "/dashboard",
    });
  };

  const handleLoginNodemailer = async () => {
    "use server"    
    await signIn("nodemailer", {
      email: "mazzulli@live.com",
      redirectTo: "/dashboard",
    });
  };

  const handleLoginResend = async () => {
    "use server"    
    await signIn("resend", {
      email: 'mazzulli@live.com', // colocar o email do cliente para envio. Pegar do parametro
      redirectTo: "/dashboard",
    });
  };

  return (
    <div className="flex flex-row items-center justify-center mt-10 gap-4">
        <Button variant={"outline"} onClick={handleLoginGitHub} className="flex items-center gap-2">          
          <IconBrandGithub className="h-4 w-4" />
          Login GitHub
        </Button>
        <Button variant={"outline"} onClick={handleLoginGoogle} className="flex items-center gap-2">
          <IconBrandGoogle className="h-4 w-4" />
          Login Google
        </Button>
        <Button variant={"outline"} onClick={handleLoginNodemailer} className="flex items-center gap-2">
          <IconBrandMeta className="h-4 w-4" />
          Login via Nodemailer
        </Button>
        <Button variant={"outline"} onClick={handleLoginResend} className="flex items-center gap-2">
          <MailCheck className="h-4 w-4" />
          Login via Resend
        </Button>
    </div>
  );
}
