# 关于github以及远程服务器中SSH密钥的配置
## 应用场景一：Github
```
github.com 是全球最大的代码托管网站，大约90%的开源项目，在github网站上托管。  
当我们向github提交分支时，每次都需要输入密码，非常麻烦低效。  
通过配置SSH密钥的方式既可以保证安全性，又不用每次都输入密码。  
```
1. 生成**rsa**密钥  
```
ssh-keygen -t rsa -b 4096 -C \"your_email@example.com\"

-t rsa：指定密钥类型为RSA。  
-b 4096：指定密钥长度为4096位。  
-C “your_email@example.com”：添加注释（通常是您的电子邮件地址），这有助于识别密钥。
```  
```
默认文件名为id_rsa 也可以指定文件名  
输入密码时直接回车，否则每次连接远程服务器还需要输入SSH密钥的密码，相当于画蛇添足
```

2. 查看生成的密钥文件  
```
Windows下路径:C\User\用户名\.ssh\
Linux下路径：/root/.ssh/
```
生成两个文件id_rsa存放私钥,id_rsa.pub存放公钥
3. 复制rsa.pub(公钥)
```
Linux：cat ~/.ssh/id_rsa.pub
Windows: 打开复制
```
4. 粘贴到
```
github:setting New SSH key
```
## 如果使用默认文件名id_rsa到这已经配置完成,否则还需进行以下操作

5. 向config文件内添加以下内容  
```
# gitgub
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```
当我们访问github.com时，指定使用该路径下这个文件中的密钥  
到这我们就有权限执行git clone <SSH仓库地址> 克隆GitHub远程仓库到本地了
## 全部完成
+ 将SSH密钥粘贴到远程Linux服务器的~/.ssh/authorized_keys路径下
+ 在本地的C\User\用户名\.ssh\config文件中添加以下内容  
```
Host <显示的服务器名字>
    HostName <服务器IP地址>
    Port <端口号>(没有就不写)
    User <服务端用户名>
    IdentityFile C:\Users\15913\.ssh\id_rsa
```
