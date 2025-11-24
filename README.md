# canva-vue
## 初始设置
### 1. Fork 仓库（在 GitHub 界面操作）

### 2. 克隆自己 fork 的仓库
```bash
git clone https://github.com/your-username/canva-vue.git
cd canva-vue
```

### 3. 添加上游仓库（组长的原始仓库）
```bash
git remote add upstream https://github.com/Wang05904/canva-vue
```

### 4. 验证远程仓库配置
```bash
git remote -v
# 应该显示：
# origin    https://github.com/your-username/canva-vue.git (fetch)
# origin    https://github.com/your-username/canva-vue.git (push)
# upstream  https://github.com/Wang05904/canva-vue.git (fetch)
# upstream  https://github.com/Wang05904/canva-vue.git (push)
```
## 开发新功能
### 1. 从主分支创建新功能分支
```bash
git checkout main
git pull upstream main  # 获取最新代码
git checkout -b feature/your-feature-name
```

### 2. 开发代码，进行多次提交 
```bash
git add .
git commit -m "fix/feat(view/service/core/store): your-feature-name"
```
### 3. 定期同步上游更改（使用 rebase）
```bash
git fetch upstream
git rebase upstream/main
```

如果出现冲突，解决后：
```bash
git add .
git rebase --continue
```

### 4. 推送到自己的远程仓库
```bash
git push -u origin feature/your-feature-name
```
## 提交PR
1. 在 GitHub 上进入自己 fork 的仓库
2. 点击 "Pull Request" → "New Pull Request"
3. 选择正确的分支（你的功能分支 → 上游的 main 分支）
4. 填写清晰的 PR 标题和描述：feat/fix(view/service/core/store):xx(描述)
5. 提交 PR

## 快速启动
```bash
pnpm install
pnpm dev
```

### 构建

```bash
pnpm build
```
