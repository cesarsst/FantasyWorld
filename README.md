# FantasyWorld

## Começando a utilizar:

Para começar a atualizar faça o clone do repositório para seu computador.
Algumas configurações precisam ser feitas para o mongoDB (é utilizado o serviço moongose)

Crie um arquivo .env na pasta raiz do projeto e adicione os seguintes dados:

    PORT=<porta em que a aplicação irá rodar>

    BD=<Link de conexão do mongoDb Atlas

    SECRET_SESSION=<uma chave secreta para sessões do express-sesison>


Após isso, execute o comando pelo cmd na pasta raiz para criar a pasta node_modules:

    "npm install" ou "yarn install"
    
    
Realizado essa operação, execute o comando:

    "yarn dev" : Para modo de desenvolvimento com nodemoon
    "node ./app.js" : Para executar manualmente 
    
Acesse no seu navegador:

    "http://localhost:<PORT ESCOLHIDA>"
    
    
## Funcionamento do servidor

O servidor é responsavel por gerenciar todas as salas do jogo. Existe uma classe "Game" onde tudo se deriva dela.
A classe game se utiliza da blibioteca Socket.io para criar uma comunicação bilateral entre o servidores e os clientes.
Todas as requisições são tratada como eventos, sendo elas eventos do usuário, que capita qualquer informação relevante
para o servidor do lado do cliente, e eventos do servidor, na qual basicamente envia dados atualizados do estado do jogo.

Cada sala no jogo representa um canal de Socket, sendo assim cada cliente registrado em um canal, recebe somente as informações pertinentes
a sala em que se encontra ativa.

![Schema Server Side](https://raw.githubusercontent.com/cesarsst/FantasyWorld/master/Diagramas/ServerSide.png?token=AHX5GNLCT4ECRYFYUVCRXL26VSN6E)


## Demo

![Schema Server Side](https://raw.githubusercontent.com/cesarsst/FantasyWorld/master/Diagramas/demo.png?token=AHX5GNOIHUO7FM76HJZO3CK6VSN6A)
