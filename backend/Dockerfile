# Use uma imagem base que tenha o Node.js e outras dependências necessárias
FROM node:18

# Defina o diretório de trabalho como o diretório do backend
WORKDIR /usr/src/app/backend

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do backend para o contêiner
COPY . .

# Exponha a porta em que o servidor backend será executado
EXPOSE 4000

# Comando para iniciar o servidor backend
CMD ["npm", "start"]
