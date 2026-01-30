import { Card, CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardTitle className="text-center mb-6 tracking-widest font-light">PRESTALINK</CardTitle>
        <CardContent>
          <form className="flex flex-col gap-6" action="">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input className="w-full" type="email" id="email" name="email" placeholder="exemple@mail.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input className="w-full" type="password" id="password" name="password" placeholder="••••••••" />
            </Field>
            <Button type="submit" className="w-full mt-2">Connexion</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
