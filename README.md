This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1h e 11m fala sobre stripe https://www.youtube.com/watch?v=DjvPeireh0s

Neste video https://www.youtube.com/watch?v=Dw72SNk-X6Y tem os exemplos de autenticação via credential, do lado do servidor e do lado do cliente (37minutos)

Para a configuração em uma pagina server side usamos o metodo "action" do form, já no client side usamos o "onSubmit" e o evento "e" e e.preventDefault(). Lembrando que tem que ser uma função async.

# SERVER SIDE

# SIGN-UP

Tem que ter a função para Signup

const signup = async({
name,
email,
secret
}: {
name: string,
email: string,
secret: string
})=>{
"use server"

    const user = await prisma.user.create({
        data: {
            name,
            email,
            secret
        }
    })
    // uma vez criado o registro já podemos fazer o login
    await signin('credentials', {email: email, password: secret}, redirectTo: '/dashboard')

}

<form action={async(formData) => {
    "use server"
    const name = formaData.get('name') as string
    const email = formaData.get('email') as string
    const secret = formaData.get('secret') as string
    await signup(name, email, secret)
}>

# SIGN-IN

<form action={async(formData) => {
    "use server"
    await signin('credentials', formData)    
}>

# CLIENT SIDE

# SIGN-UP

<form onSubmit={async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const name = formaData.get('name') as string
    const email = formaData.get('email') as string
    const secret = formaData.get('secret') as string

    await signup({name, email, secret}) // import auth ou do next-auth

}>

# SIGN-IN

<form onSubmit={async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    await signin('credentials', {
        name: formaData.get('name') as string,
        email: formaData.get('email') as string,
        redirectTo: '/dashboard'
    })    
}>
