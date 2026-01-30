'use client';

import { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminUsersPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'manager' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
        setName('');
        setRole('user');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch {
      setMessage({
        type: 'error',
        text: "Erreur lors de la création de l'utilisateur",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardTitle className="text-center mb-6">Créer un utilisateur</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <Input
                className="w-full"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                className="w-full"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean.dupont@exemple.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="role">Rôle</FieldLabel>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'user' | 'manager' | 'admin')}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                required
              >
                <option value="user">Utilisateur</option>
                <option value="manager">Manager</option>
                <option value="admin">Administrateur</option>
              </select>
            </Field>

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Création en cours...' : "Créer l'utilisateur"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-md text-sm text-slate-600">
            <p className="font-semibold mb-2">ℹ️ Information</p>
            <p>
              Un mot de passe sera généré automatiquement et envoyé par email à
              l&apos;utilisateur.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
