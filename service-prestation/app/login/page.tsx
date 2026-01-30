import { Card, CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"


export default function page() {
  return (
    <Card className="flex justify-center items-center m-auto">
      <CardTitle>Connexion</CardTitle>
      <CardContent>
        <form action="">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input type="email" id="email" name="email" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input type="password" id="password" name="password" />
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}
