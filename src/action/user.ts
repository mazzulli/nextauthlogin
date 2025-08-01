import { CredentialsSignin } from "next-auth";
import { signIn } from "next-auth/react";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  } catch (error) {
    const errorMessage = error as CredentialsSignin;
    return errorMessage.cause || "An error occurred during login.";
  }
};

export { login };
