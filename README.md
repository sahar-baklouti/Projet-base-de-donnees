# Installation
### requirement
#### install requirement:
#### Windows:
Download from link. \
`NodeJs` : Install from https://nodejs.org/en/download/ \
`Python3 >= 3.6`: Install from https://www.python.org/downloads/release/python-379/ \
`Pip` : For Python : to install pip see https://pip.pypa.io/en/stable/installation/

#### Mac:
```bash
brew install python3

# download and install setuptools
curl -O https://bootstrap.pypa.io/ez_setup.py
python3 ez_setup.py
# download and install pip
curl -O https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py

brew install npm
```

### Linux
Ubuntu >= 18.04 already has python >= 3.6 installed.
```bash
# download and install setuptools
curl -O https://bootstrap.pypa.io/ez_setup.py
python3 ez_setup.py
# download and install pip
curl -O https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py

apt update
apt install npm
```

# Pepare environment
Open a terminal or a cmd for windows user
```bash
cd Projet-base-de-donnees
pip install -r requirement.txt
npm install @angular/cli
```
you can now run the project

# Run The Project
### Windows
Open a cmd
```bash
cd Projet-base-de-donnees
start.bat
```
### Mac - Linux
Open a terminal
```bash
cd Projet-base-de-donnees
sh start.sh
```
# Welcome to the garage
Dans un navigateur se rendre à l'adresse : http://localhost:4200/
Connectez avec : 
1) 1_Dupin_Paul : 4569 (administrateur de la base de données)
2) 2_Creuzet_Victor : 9632