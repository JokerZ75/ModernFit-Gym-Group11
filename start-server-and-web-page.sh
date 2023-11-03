if ! [ -x "$(command -v pm2)" ]; then
  echo 'Error: pm2 is not installed.' >&2
  npm install pm2 -g
fi


cd backend
npm install
pm2 --name "backend" start npm -- run dev --port 3001
cd ../frontend
npm install
pm2 --name "frontend" start npm -- run dev

while true; do
    read -p "Do you wish to close all servers? (y) to quit " yn
    case $yn in
        [Yy]* ) pm2 delete all; break;;
    esac
done
