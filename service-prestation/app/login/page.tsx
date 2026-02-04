"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSavedEmail } from "@/store/slices/user-preferences-slice";
import { setUser } from "@/store/slices/user-slice";
import { selectSavedEmail } from "@/store/selectors/user-preferences-selector";

export default function Page() {
  const savedEmail = useAppSelector(selectSavedEmail);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Pré-remplir l'email si sauvegardé
  useEffect(() => {
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [savedEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation Regex de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }
      console.log(data);
      dispatch(setUser(data.user));

      if (rememberMe) {
        dispatch(setSavedEmail(email));
      } else {
        dispatch(setSavedEmail(null));
      }
      router.refresh();
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md z-9999">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardTitle className="text-center mb-6 tracking-widest font-light">
          PRESTALINK
        </CardTitle>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                className="w-full"
                type="email"
                id="email"
                name="email"
                placeholder="exemple@mail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                className="w-full"
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true;
                  setRememberMe(isChecked);
                  if (isChecked) {
                    dispatch(setSavedEmail(email));
                  } else {
                    dispatch(setSavedEmail(null));
                  }
                }}
              />
              <FieldLabel htmlFor="rememberMe">
                Se souvenir de mon email
              </FieldLabel>
            </Field>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? <Spinner /> : "Connexion"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
