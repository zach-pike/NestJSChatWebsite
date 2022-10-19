FILE=~/.npm-global  
if [ -d $FILE ]; then
  echo "Skipping configuration"
else
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
  source ~/.profile

  npm i -g @nestjs/cli
fi

npm run start