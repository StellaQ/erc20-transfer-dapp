# ERC20 Transfer DApp

一个基于 React + Wagmi + Viem 实现的轻量级 ERC20 Token 转账工具。

## 🚀 功能特性

### 钱包连接 (Wallet Connection)
- 支持 MetaMask 等 EVM 钱包连接
- 显示当前钱包地址和网络信息
- 钱包未连接时自动禁用所有操作

### Token 配置 (Token Configuration)
- 输入 ERC20 Token 合约地址
- 自动读取 Token 基本信息：
  - Token 名称 (name)
  - Token 符号 (symbol)
  - 小数位数 (decimals)

### 余额读取 (Balance Reading)
- 读取用户钱包中的 ERC20 Token 余额
- 自动格式化显示（考虑 decimals）

### ERC20 转账 (ERC20 Transfer)
- 输入接收地址和转账金额
- 自动处理 decimals 转换
- 实时显示转账状态（Pending/Success/Failed）

### 交易结果 (Transaction Result)
- 显示交易哈希（可点击跳转 Etherscan）
- 显示区块号和 Gas 使用量
- 状态提示

## 🛠️ 技术栈

- **Frontend**: React 18 + Vite
- **Web3**: Wagmi v2 + Viem
- **样式**: Tailwind CSS
- **网络**: Ethereum Sepolia Testnet

## 📦 安装和运行

### 环境要求
- Node.js 16+
- 支持 EIP-1193 的钱包（如 MetaMask）

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```

访问 http://localhost:5173/erc20-transfer-dapp/

### 构建生产版本
```bash
npm run build
```

## 🔧 配置说明

### Wagmi 配置
项目使用 Sepolia 测试网，连接器包括：
- MetaMask
- WalletConnect
- Injected wallets

### 合约 ABI
使用标准 ERC20 ABI，支持以下方法：
- `name()` - 获取 Token 名称
- `symbol()` - 获取 Token 符号
- `decimals()` - 获取小数位数
- `balanceOf(address)` - 查询余额
- `transfer(address,uint256)` - 转账

## 🎯 使用指南

1. **连接钱包**
   - 点击"Connect Wallet"按钮
   - 选择钱包并确认连接
   - 确保网络为 Sepolia 测试网

2. **配置 Token**
   - 在输入框中输入 ERC20 合约地址
   - 点击"Load Token Info"加载 Token 信息
   - 查看 Token 名称、符号和你的余额

3. **执行转账**
   - 输入接收地址（0x 开头）
   - 输入转账金额
   - 点击"Send Tokens"确认转账

4. **查看结果**
   - 等待交易确认
   - 查看交易哈希和区块信息

## 📁 项目结构

```
/
├─ src/
│  ├─ components/
│  │   ├─ WalletConnect.jsx    # 钱包连接组件
│  │   ├─ TokenInfo.jsx        # Token信息组件
│  │   ├─ TransferForm.jsx     # 转账表单组件
│  │   └─ TxResult.jsx         # 交易结果组件
│  ├─ config/
│  │   └─ wagmi.js            # Wagmi配置
│  ├─ lib/
│  │   └─ abi.js              # ERC20 ABI定义
│  ├─ App.jsx                 # 主应用组件
│  ├─ main.jsx                # 应用入口
│  └─ index.css               # 全局样式
├─ public/
├─ package.json
├─ vite.config.js             # Vite配置
├─ tailwind.config.js         # Tailwind配置
├─ postcss.config.js          # PostCSS配置
└─ README.md
```

## 🚀 部署到 GitHub Pages

### 自动部署
1. 推送代码到 GitHub 仓库
2. 在仓库 Settings > Pages 中设置：
   - Source: Deploy from a branch
   - Branch: gh-pages
3. 运行构建命令：
   ```bash
   npm run build
   git subtree push --prefix dist origin gh-pages
   ```

### 手动部署
```bash
npm run build
# 将 dist/ 目录内容上传到 gh-pages 分支
```

## 🧪 测试建议

### 功能测试
- [ ] 钱包连接正常
- [ ] Token 信息读取正确
- [ ] 余额显示准确
- [ ] 转账功能正常
- [ ] 交易状态更新及时

### UI 测试
- [ ] 响应式布局正常
- [ ] Loading 状态显示
- [ ] 错误提示清晰
- [ ] 表单验证有效

## 🔒 安全注意事项

- 仅在测试网使用
- 不要在生产环境中使用测试代码
- 转账前仔细检查地址和金额
- 保护好你的私钥和助记词

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题请通过 GitHub Issues 联系。