import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UserRole } from "../types";

interface AuthForm {
  username: string;
  password: string;
  role: UserRole;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useUser();
  const { toast } = useToast();
  const form = useForm<AuthForm>();

  const onSubmit = async (data: AuthForm) => {
    try {
      const result = isLogin ? await login(data) : await register(data);
      if (!result.ok) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Username"
                {...form.register("username", { required: true })}
              />
              <Input
                type="password"
                placeholder="Password"
                {...form.register("password", { required: true })}
              />
              <select {...form.register("role", { required: true })}
                className="w-full p-2 border rounded">
                <option value="client">Client</option>
                <option value="delivery">Delivery</option>
                <option value="supplier">Supplier</option>
              </select>
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Register"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Need an account?" : "Already have an account?"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
