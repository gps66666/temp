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
### MySQL基本操作
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
### 进阶语法
#### WHERE子句
 搭配SELECT、UPDATE等使用
 + 优先级顺序：NOT>ADD>OR。
```
SELECT *FROM [表名] WHERE [字段] >1 AND [字段] <5;   
SELECT *FROM [表名] WHERE [字段1] >1 AND [字段1] <5 OR [字段2] >1 AND [字段2] <5;  
```
+ 括号可以改变优先级：
```
SELECT *FROM [表名] WHERE [字段1] >1 AND ([字段1] <5 OR [字段2] >1) AND [字段2] <5;
```
+ IN 查找多个值
```
SELECT *FROM [表名] WHERE [字段] IN (1,2,3);
```
+ BETWEEN AND查找在某范围的值
```
SELECT *FROM [表名] WHERE [字段] BETWEEN 1 AND 3;
```
+ NOT 取反，可加在任何条件语句前
```
SELECT *FROM [表名] WHERE [字段] NOT BETWEEN 1 AND 3;
```
+ LIKE 模糊查询 '%' 表示任意一个通配符 '_'表示任意一个字符   
```
SELECT *FROM [表名] WHERE [字段] LIKE '王%';   字段以'王'开头  
SELECT *FROM [表名] WHERE [字段] LIKE '%王%';  字段中包含'王'  
SELECT *FROM [表名] WHERE [字段] LIKE '王_';   字段为王* -两个字
```
+ REGEXP 正则表达式查询  
>- . 任意单个字符
>- ^ 开头 
>- $ 结尾
>- [abc] 其中任意一个字符
>- [a-z] 范围内任意字符
>- A|B A或者B
```
SELECT *FROM [表名] WHERE [字段] REGEXP '^王.$';  王*
SELECT *FROM [表名] WHERE [字段] REGEXP '王';     包含'王'
SELECT *FROM [表名] WHERE [字段] REGEXP '[王张]'; 包含'王'或'张'
SELECT *FROM [表名] WHERE [字段] REGEXP '王|张';  包含'王'或'张'
```
+ 查找null
```
SELECT *FROM [表名] WHERE [字段] is null;
SELECT *FROM [表名] WHERE [字段] is NOT null;
SELECT *FROM [表名] WHERE [字段] <=> null;   (不推荐)
```
#### ORDER BY 指定排列顺序
```
SELECT *FROM [表名] ORDER BY [字段];        默认升序
SELECT *FROM [表名] ORDER BY [字段] DESC;   降序
SELECT *FROM [表名] ORDER BY [字段1] DESC, [字段2] ASC; 字段1降序,字段2升序(ASC可不写)
SELECT *FROM [表名] ORDER BY <列序号>;   用列序号代替列名 排序
```
####  聚合函数
```
AVG()   返回集合均值
COUNT() 返回集合项目数
MAX()   最大值
MIN()   最小值
SUM()   求和
```
参数填入*，表示整个表 填入<列名> 仅对该列
#### GROUP BY 分组
```
SELECT [字段] ,COUNT(*) FROM [表名] group by [字段];    后面可以加一个或多个[字段]
SELECT [字段] ,COUNT(字段) FROM [表名] group by [字段];  表示按照这个字段分组
```
+ HAVING 过滤
```
SELECT [字段] ,COUNT([字段]) FROM [表名] group by [字段] HAVING COUNT(level)>4 ORDER BY;  
```
#### LIMIT 限制前几名
```
LIMIT n;    前n名
LIMIT n,m    第n+1到第m名
```
#### DISTINCT 去除重复结果
```
SELECT DISTINCT [字段] FROM [表名]; 
```
#### EXESITS 查询
```
SELECT exists(SELECT * FROM [表名] WHERE [字段] is null;)
```
#### 语句间语法
+ UNION 合并查询结果
```
SELECT ...
UNION ALL          不加ALL,默认去掉重复   
SELECT ...
```
+ INTERSECT 两个查询结果的交集
```
SELECT ...
INTERSECT          
SELECT ...
```
+ EXCEPT 两个查询结果的交集 1中减去2中含有的
```
SELECT ...    1
EXCEPT                
SELECT ...    2
```
#### 子查询和 as 命名
```
SELECT * FROM [表名] ,ROUND((SELECT AVG([字段]) FROM [表名])) as average,
level - ROUND ((SELECT AVG([字段]) FROM [表名])) as diff from [表名];
CREATE table [新表名] (SELECT * FROM [表名] WHERE [字段] REGEXP '王';);
INSERT INTO [表名] (SELECT * FROM [表名] WHERE [字段] is null;)
```
### 表关联
+ inner join内连接

>select * from [表1] **inner join** [表2] **on** <表1>.<表1中字段> = <表2>.<表2中字段>  
>或者  
>select * from [表1] ,[表2]    
>**where** <表1>.<表1中字段> = <表2>.<表2中字段>  
>或者  
>select * from [表1] [别名1] ,[表2] [别名2]   
>**where** <别名1>.<表1中字段> = <别名2>.<表2中字段>
+ left join左连接
>select * from [表1] **left join** [表2] **on** <表1>.<表1中字段> = <表2>.<表2中字段> 
+ right join右连接
>select * from [表1] **right join** [表2] **on** <表1>.<表1中字段> = <表2>.<表2中字段> 
### 索引
>1. 索引创建  
>CREATEN [UNIQUE|FULLTEXT|SPATIAL] INDEX <索引名>
>alter table <表名> add index <索引名> (<字段>,...)
>ON <表名> ([字段1],...)
>2. 查看索引  
>show index from <表名>
>3. 删除索引  
>drop index <索引名称> on <表名>
### 视图
创建视图
>create view <视图名>  
>as  
>SELECT 语句等  
视图并不创建表，而是执行写入的SQL语句