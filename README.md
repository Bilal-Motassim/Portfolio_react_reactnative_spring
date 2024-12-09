[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/PV0ga_mM)

## Execution locale
* Cloner projet
```bash
git clone https://github.com/iir-projets/projet-dev-2324-g6-iir4g2324g1g2.git
```

* Telecharger les submodules
```bash
git submodule update
```

### Demarer le back-end spring boot
* Remplacer ces variables dans le fichier `Portfolio-spring-boot\src\main\resources\application.properties`.
```properties
SPRING.DATASOURCE.URL=<url de la base de donnee>
SPRING.DATASOURCE.USERNAME=<utilisateur>
SPRING.DATASOURCE.PASSWORD=<mot de passe>
```

* Aller dans le repertoire `\Portfolio-spring-boot` et executer la command
```bash
cd ./Portfolio-spring-boot
./mvnw build
```
* Lancer l'application
```bash
java -jar ./target/portfolio-0.1.war
```
### Demarer le front-end web react
* Aller dans le repertoire `\Portfolio-react-web` et executer la command
```bash
npm install
npm start
```

### Demarer le front-end mobile react-native
* Aller dans le repertoire `\Portfolio-react-mobile` et executer la command
```bash
npm install
npm start
```

### En utilisant Docker
* Pour Docker les paramètres pour le backend sous trouve dans `.env`, pour lancer le web aller a `/projet-dev-2324-g6-iir4g2324g1g2` et executer
```bash
docker compose up web
```
* Pour lancer le mobile
```bash
docker compose up mobile
```
