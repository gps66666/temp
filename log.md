# 1.本地与远程分支历史记录出现分歧的情况及解决办法

当本地分支和远程分支的历史记录出现分歧时，例如在本地对分支进行了一些提交，同时远程分支也有了新的提交，此时若直接执行类似 `git pull` 这种通常会尝试快进式合并的操作，便可能失败并出现相应错误。

## 解决办法
可先将远程分支的最新内容拉取到本地并尝试合并，而非简单的快进式合并。具体可使用 `git pull --rebase` 命令，其会先拉取远程分支的更新，然后将本地的提交“变基”到更新后的远程分支上，以此保持提交历史的相对整洁。示例如下：

```bash
git pull --rebase origin <你的分支名>
```
# 2.连接（检查）远程仓库命令
```bash
ssh -T git@github.com
```
回车输入密码后显示： 
``` 
Hi gps66666! You've successfully authenticated, but GitHub does not provide shell access.
```