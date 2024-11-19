# Linux服务器的配置(LAMP堆栈)
## 安装LAMP
```
apt-get install lamp-server^  
```
## Mysql
```
查看是否启动  
systemctl status mysql   
启动命令  
systemctl start mysql
默认用户名密码位置  
/etc/mysql/debian.cnf  
登录命令  
mysql -u <用户名> -p  回车键入密码  
登陆后,修改root密码  
update user set authentication_string=PASSWORD("@98k12345") where user ='root';   
清屏   
\! clear 
``` 
### select user, host from user where user='root';报错显示：MySql ERROR 1046(3D000): No Database Selected  
```
解决方法：show databases; 显示数据库表发现，有一个名为"mysql"的表  
use mysql  选择mysql表  
```

