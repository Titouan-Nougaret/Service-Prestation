/**
 * Script pour créer le premier utilisateur administrateur
 * Usage: node scripts/create-admin.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    // Connexion à MongoDB
    const mongoUri =
      "mongodb+srv://it_db_user:SRsMKLKaJdL0mHRt@cluster0.ql9lhkc.mongodb.net/?appName=Cluster0";
    await mongoose.connect(mongoUri);
    console.log("✅ Connecté à MongoDB");

    // Définir le schéma User
    const UserSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
          type: String,
          enum: ["user", "manager", "admin"],
          default: "user",
        },
      },
      {
        timestamps: true,
      },
    );

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Demander les informations
    console.log("\n📝 Création du premier administrateur\n");
    const name = await question("Nom complet: ");
    const email = await question("Email: ");
    const password = await question("Mot de passe: ");

    // Vérifier si un utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Un utilisateur avec cet email existe déjà");
      process.exit(1);
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'administrateur
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("\n✅ Administrateur créé avec succès!");
    console.log(`   ID: ${admin._id}`);
    console.log(`   Nom: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Rôle: ${admin.role}\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

createAdmin();
