import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import dbConnect from '@/lib/mongo/dbConnect';
import User from '@/models/User';
import { generateRandomPassword, sendCredentialsEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.json(
        { message: 'Non autorisé' },
        { status: 401 }
      );
    }

    const session = await decrypt(sessionCookie);
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { message: 'Accès refusé. Droits administrateur requis.' },
        { status: 403 }
      );
    }

    // Get data from request
    const { email, name, role } = await request.json();

    if (!email || !name || !role) {
      return NextResponse.json(
        { message: 'Email, nom et rôle requis' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['user', 'manager', 'admin'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: 'Rôle invalide' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      );
    }

    // Generate random password
    const password = generateRandomPassword();

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Send credentials email
    try {
      await sendCredentialsEmail(email, password);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Delete the user if email fails
      await User.deleteOne({ _id: user._id });
      return NextResponse.json(
        { message: 'Erreur lors de l\'envoi de l\'email. Utilisateur non créé.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Utilisateur créé avec succès. Email envoyé.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
