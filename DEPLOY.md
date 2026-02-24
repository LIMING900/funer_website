# 部署到 GitHub Pages

## 一、一次性：配置 GitHub 认证（二选一）

### 方式 A：SSH（推荐，已把仓库改为 SSH 地址）

1. **看本机是否已有 SSH 公钥**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   或
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
   有输出一串 `ssh-ed25519 ...` 或 `ssh-rsa ...` 就说明有。

2. **没有公钥就生成一个**
   ```bash
   ssh-keygen -t ed25519 -C "你的邮箱@example.com" -N ""
   ```
   再执行一次：`cat ~/.ssh/id_ed25519.pub`

3. **把公钥加到 GitHub**
   - 打开 https://github.com/settings/keys
   - 点 **New SSH key**
   - Title 随便填（如：My Mac）
   - Key 里粘贴刚才 `cat` 出来的整行内容
   - 点 **Add SSH key**

4. **试一下是否能用**
   ```bash
   ssh -T git@github.com
   ```
   出现 “Hi LIMING900! You've successfully authenticated...” 就说明成功。

---

### 方式 B：HTTPS + Personal Access Token

若你坚持用 HTTPS，需要用 Token 代替密码：

1. 打开 https://github.com/settings/tokens
2. **Generate new token** → **Generate new token (classic)**
3. Note 填：`deploy`；勾选 **repo**
4. 生成后**复制** token（只显示一次）
5. 把远程改回 HTTPS（如需要）：
   ```bash
   git remote set-url origin https://github.com/LIMING900/funer_website.git
   ```
6. 以后执行 `npm run deploy` 时，提示输入密码时**粘贴这个 token**（不要填登录密码）

---

## 二、每次更新网站时

在项目根目录执行：

```bash
npm run deploy
```

会先构建再推送到 `gh-pages` 分支，过 1～2 分钟刷新你的 GitHub Pages 地址即可看到更新。

---

## 三、确认 GitHub Pages 设置

- 打开：**你的仓库 → Settings → Pages**
- **Source** 选：**Deploy from a branch**
- **Branch** 选：**gh-pages**
- **Folder** 选：**/ (root)**  
保存后页面才会从 `gh-pages` 发布。
