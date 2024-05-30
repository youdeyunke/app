tarfile="admin2-2021.tar.gz"
rm -rf $tarfile
rm -rf admin2
yarn run build:prod --fix
tar -czvf $tarfile admin2
scp $tarfile ubuntu@udeve.cn:/tmp/

# 同步到demo
scp -rC admin2  ubuntu@udeve.cn:~/fang-panel-www/demo/
mv $tarfile /tmp/
