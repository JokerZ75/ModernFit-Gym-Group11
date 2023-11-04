if ! [ -x "$(command -v pm2)" ]; then
  echo 'Error: pm2 is not installed.' >&2
  npm install pm2 -g
fi

if [ "$(uname)" == "MINGW64_NT-10.0" ]; then
  echo 'Error: please run this script in WSL.' >&2
  echo 'Please install WSL from https://docs.microsoft.com/en-us/windows/wsl/install-win10' >&2
  exit 1
fi

if [ "$(uname)" == "Linux" ]; then
  if ! [ -x "$(command -v redis-server)" ]; then
    echo 'Error: redis-server is not installed.' >&2
    sudo apt-get install redis-server
  fi
fi

if [ "$(uname)" == "Darwin" ]; then
  if ! [ -x "$(command -v redis-server)" ]; then
    echo 'Error: redis-server is not installed.' >&2
    if ! [ -x "$(command -v brew)" ]; then
      echo 'Error: brew is not installed.' >&2
      echo 'Please install brew from https://brew.sh/' >&2
      exit 1
    else
      brew install redis
    fi
  fi
fi

pm2 --name "redis" start redis-server
cd backend
npm install
pm2 --name "backend" start npm -- run dev --port 3001
cd ../frontend
npm install
pm2 --name "frontend" start npm -- run dev


while true; do
    read -p "Do you wish to close all servers? (y) to quit or (l) for logs " yn
    case $yn in
        [Yy]* ) pm2 delete all; break;;
        [Ll]* ) pm2 logs --nostream;;

    esac
done


