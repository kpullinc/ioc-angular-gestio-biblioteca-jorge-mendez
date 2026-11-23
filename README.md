# Nom de l'aplicació
Gestió de biblioteca

# Versió de l'aplicació
0.3

## Autor/a
Jorge Méndez

## Descripció
Aplicació per gestionar usuaris, fons bibliogràfic i prèstecs d'una biblioteca

## Versions utilitzades
node version 22.2.0
npm version 11.19.0
Angular 24.21.0
Git 2.43.0

## Com crear i executar el projecte
ng serve -o
## Com arrencar el json-server
npm run api
**Recordeu que el port 4301 ha d'estar lliure**. Si està ocupat, modifiqueu-lo a l'escript "api" a package.json

## Estat de l'EAC3
Acabada. I esperem que de forma correcta. He ampliat modificant components anterioris i creant:
- Serveis:
    - elements.service.ts
    - historial-cerques.service.ts
- Models i adaptadors:
    - element.adaptador.ts
    - element.model.ts
- Formularis: 
    - formulari-cerca.component (.html/.scss/.ts)
    - formulari-nou-element.component (.html/.scss/.ts)


## Enllaç del repositori principal
https://github.com/kpullinc/ioc-angular-gestio-biblioteca-jorge-mendez

## Enllaç a la branca 3
https://github.com/kpullinc/ioc-angular-gestio-biblioteca-jorge-mendez/tree/ra2-components