"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl,Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';

import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    email: z.email("E-mail inválido!"),
    password: z.string("Senha inválida!").min(8, "Senha inválida")
})


type FormValues = z.infer<typeof formSchema>;



const Singinform = () => {

   const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    }
   })


   function onSubmit(values: FormValues){
    console.log("FORMULARIO VALIDO E ENVIADO")
    console.log(values)
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