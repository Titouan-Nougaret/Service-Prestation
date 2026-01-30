import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo/dbConnect';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const data = await request.json();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Cet utilisateur existe déjà" }, { status: 400 });
    }

    // Création de l'utilisateur (le mdp sera haché par le middleware du modèle)
    const user = await User.create({
      name,
      email,
      password
    });

    return NextResponse.json({ 
      message: "Utilisateur créé avec succès !",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, { status: 201 });
  } catch (e) {
    console.error('Erreur API:', e);
    return NextResponse.json({ 
      message: "Erreur lors de la création de l'utilisateur", 
      error: e instanceof Error ? e.message : 'Unknown error' 
    }, { status: 500 });
  }
}
