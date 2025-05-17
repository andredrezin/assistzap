#!/bin/bash

# Script para build e preparação para implantação do AssistZap Pro

echo "Iniciando processo de build e preparação para implantação..."

# Criar diretório para o build do frontend
mkdir -p frontend-build

# Navegar para o diretório do frontend e instalar dependências
echo "Instalando dependências do frontend..."
cd assistzap-pro-frontend
npm install

# Construir o frontend
echo "Construindo o frontend React..."
npm run build

# Voltar para o diretório raiz
cd ..

# Copiar os arquivos do build para o diretório frontend-build
echo "Copiando arquivos do build para o diretório de implantação..."
cp -r assistzap-pro-frontend/dist/* frontend-build/

# Instalar dependências do backend
echo "Instalando dependências do backend..."
npm install

echo "Processo de build e preparação concluído com sucesso!"
echo "O sistema está pronto para implantação na Render."
