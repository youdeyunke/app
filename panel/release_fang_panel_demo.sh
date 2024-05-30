rm -rf admin2
yarn run build:prod --fix

# 同步到demo
scp -rC admin2  ubuntu@udeve.cn:~/fang-panel-www/demo/
