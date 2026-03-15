#!/bin/bash
echo "===== LEGALFORM WEBAPP DEPLOY ====="

echo "📂 Dossier actuel :"
pwd

echo "📦 Installation des dépendances..."
npm install

echo "🏗 Build production..."
npm run build

echo "📌 Ajout des modifications..."
git add .

echo "📝 Commit..."
git commit -m "Update build"

echo "🚀 Push vers le dépôt distant..."
git push

echo "✅ DEPLOYEMENT TERMINE"
echo "📁 Dossier production : dist/"

git add -f dist
git commit -m "add dist"
git push -f origin main

