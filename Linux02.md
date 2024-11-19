# Linux服务器的配置(LAMP堆栈)
## 安装LAMP
```
apt-get install lamp-server^  
```
## Mysql

>查看是否启动  
>```
>systemctl status mysql  
>``` 
>启动命令  
>```
>systemctl start mysql   
>systemctl restart mysql  
>```
>默认用户名密码位置  
>```
>/etc/mysql/debian.cnf  
>```
>登录命令  
>```
>mysql -u <用户名> -p  回车键入密码  
>```
>登陆后,修改root密码  
>```
>update user set authentication_string=PASSWORD("@98k12345") where user ='root'; 
>```  
>查看mysql端口信息    
>```
>show variables like '%port%'; 
>```
>查看是否开放端口   
>```
>Select user, host from user where user='root'  
>```
>若root用户的host字段值为localhost则该用户只能在本地访问数据库
>```
>UPDATE user SET host='%'WHERE user='root';
>```
>修改mysql配置文件,讲127.0.0.1改为0.0.0.0可监听外部地址    
>```
>sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
>``` 
>清屏   
>```
>\! clear
>```
### Select user, host from user where user='root';报错显示：MySql ERROR 1046(3D000): No Database Selected  
```
解决方法：show databases; 显示数据库表发现，有一个名为"mysql"的表  
use mysql  选择mysql表  
```
## MySQL基本操作
>1.查看当前存在的数据库
>>show databases;  
>
>2.创建数据库
>>create database [数据库名];
>
>3.删除数据库
>>drop detabase [数据库名];
>
>4.创建表
>>create table([字段名] <类型>,[字段名] <类型>,[字段名] <类型>,...[字段名] <类型>)
>
>5.选择表
>>use [表名];
>
>6.查看表的结构
>>DESC [表名];
>
>7.修改表
>```
>修改字段类型  
>alter table [表名] MODIFY COLUMN [字段名] <新类型名>;  
>修改字段名  
>alter table [表名] RENAME COLUMN [原字段名] to [新字段名];
>修改默认值为 1
>alter table [表名] MODIFY [字段名] <类型> DEFAULT 1;
>添加字段  
>alter table [表名] ADD COLUMN [字段名] <类型名>;
>删除字段
>alter table [表名] DROP COLUMN [字段名];
>```
>8.删除表
>>DROP [表名];
>
>9.增删查改表的内容
>```
>插入  
>INSERT INTO [表名] ([字段],[字段],[字段],..) VALUES(<值>,..),(<值>,...);
>
>查询
>SELECT * FROM [表名];
>
>修改
>UPDATE [表名] set [字段] = <值> where [检索字段] = <检索值>;
>UPDATE [表名] set [字段] = <值>, [字段] = <值>;
>
>删除
>DELETE FROM [表名] where [字段] = <值>
>```
>10.导入和导出
>```
>mysql -u root -p <导入到的数据库> < <.sql文件>
>mysqldump -u root -p <即将导出的数据库> <表名>(可省略) > <导出到位置url>
>```
## 进阶语法
### WHERE子句
```
搭配SELECT

```