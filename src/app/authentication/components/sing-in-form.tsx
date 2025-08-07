"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl,Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {zodResolver} from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import z from "zod";

const formSchema = z.object({
    email: z.email("E-mail inválido!"),
    password: z.string("Senha inválida!").min(8, "Senha inválida")
})


type FormValues = z.infer<typeof formSchema>;



const Singinform = () => {

    const router = useRouter();

   const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    }
   })


  async function onSubmit(values: FormValues){
     await authClient.signIn.email({
      email:values.email,
      password:values.password,
      fetchOptions:{
        onSuccess: () => {
            router.push('/')
        },
        onError: (ctx) => {

            if(ctx.error.code === "User not found"){
                toast.error("E-mail ou senha inválidos.")
               return form.setError("email",{
                    message: "E-mail ou senha inválidos."
                })
            }

            if(ctx.error.code === "INVALID_EMAIL_OR_PASSWORD"){
                toast.error("E-mail ou senha inválidos.")
               return form.setError("email",{
                    message: "E-mail ou senha inválidos."
                })
            }

          
            toast.error(ctx.error.message);
            
        }
      }
     })
   }

    return(
    <>
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Card>
            <CardHeader>
              <CardTitle>Acessar conta</CardTitle>
              <CardDescription>
                Acesse sua conta para continuar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormDescription>
                Digite seu email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormDescription>
                Digite sua senha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            </CardContent>
            <CardFooter>
              <Button>Entrar</Button>
            </CardFooter>
          </Card>
      </form>
    </Form>
    
    </>
    )
}

export default Singinform;