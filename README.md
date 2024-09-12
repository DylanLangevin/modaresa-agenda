# Test Technique MODARESA

Ce projet utilise Docker Compose pour orchestrer et exécuter les différents services nécessaires. Voici les étapes pour cloner le dépôt et lancer les services.

## Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

Clonez ce dépôt :

   ```bash
   git clone https://github.com/DylanLangevin/modaresa-agenda.git
   ```
Rendez-vous dans le dossier du projet :
  ```bash
  cd modaresa-test-tech
  ``` 

Exécutez
```bash
docker compose up --build -d
```

Pour accéder au site : 
http://localhost:3001

