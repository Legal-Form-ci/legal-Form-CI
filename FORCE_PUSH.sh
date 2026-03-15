#!/bin/bash

echo "===== FORCE PUSH LEGALFORM ====="

echo "📂 Dossier actuel :"
pwd

echo "🔄 Ajout de TOUS les fichiers (même supprimés)..."
git add -A

echo "📝 Création du commit..."
git commit -m "Force update" 2>/dev/null || echo "Rien à commit"

echo "🚀 Push forcé vers origin main..."
git push -u origin main --force

echo "✅ TERMINÉ"
