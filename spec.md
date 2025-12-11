spec.md — ERC20 Transfer DApp

版本：v1.0 — 可直接用于开发与开源展示

1. Project Overview（项目概述）

ERC20 Transfer DApp 是一个基于 React + Wagmi + Viem 实现的轻量级工具，用于：

读取 ERC20 Token 基本信息（name, symbol, decimals）

读取钱包的 ERC20 余额

执行 ERC20 Token 转账

显示交易 hash、状态、区块信息

该项目默认运行在 Ethereum 测试网（Sepolia），并支持通过 UI 自定义 ERC20 合约地址。

项目将部署在 GitHub Pages，支持静态构建。

2. Features（功能清单）
2.1 Wallet Connection

支持 MetaMask 等 EVM 钱包连接

显示当前钱包地址

显示当前网络信息

钱包未连接时禁用所有读写操作

2.2 Token Configuration

输入框配置 ERC20 token 合约地址

使用 wagmi 的 useReadContract 自动读取：

name()

symbol()

decimals()

2.3 Balance Reading

使用 useReadContract 调用：

balanceOf(address)


将数值从 raw → formatUnits(decimals)

2.4 ERC20 Transfer

输入：

目标地址

数量（自动使用 decimals 格式转换）

使用 useWriteContract 调用：

transfer(address,uint256)


显示转账状态：

Pending

Success

Failed

2.5 Transaction Result Panel

显示：

交易 hash（可点击跳转区块浏览器）

区块号

Gas used

状态提示

2.6 Error Handling

合约地址不合法

钱包未连接

用户取消交易

转账数量不足

目标地址非法

Wrong chain（提示切换到 Sepolia）

3. System Architecture（技术架构）
Frontend
技术	用途
React 18	UI
Vite	构建工具（适合 GitHub Pages）
Wagmi v2	钱包连接 + 合约读写
Viem	wagmi 底层 provider
Tailwind CSS	样式
Blockchain

Ethereum Sepolia Testnet

默认使用 ERC20 测试 token（例如：Sepolia USDC）

4. UI / UX Specification（界面设计）
Main UI Layout
Header:
    - Wallet Connect Button
    - Connected Address
    - Current Network

Token Section:
    - Token Contract Address (input)
    - [Load Token Info] button
    - Token Name / Symbol / Decimals
    - User Balance

Transfer Section:
    - Recipient Address (input)
    - Amount (input, human-readable)
    - [Send] button

Transaction Result Section:
    - Hash
    - Block number
    - Gas used
    - Status (pending / success / fail)


UI 要求：

统一使用 Tailwind

调用中应显示 Loading spinner

错误信息用红色小字显示

5. Contract Interface（ABI）

项目所需最小 ABI：

[
  { "constant":true, "inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},
  { "constant":true, "inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},
  { "constant":true, "inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
  { "constant":true, "inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},
  { "constant":false, "inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}
]

6. Data Flow（数据流）
6.1 读取余额流程
钱包连接 → 输入token合约地址 → useReadContract (balanceOf) →
格式化 → 显示在UI

6.2 转账流程
用户输入 to + amount →
validate →
amount → parseUnits →
useWriteContract (transfer) →
返回 txHash →
await getTransactionReceipt →
显示 blockNumber + gasUsed →
刷新余额

7. Error Handling（错误处理）
场景	显示信息
钱包未连接	“Please connect wallet first.”
用户取消交易	“User rejected transaction.”
余额不足	“Insufficient balance.”
Wrong chain	“Please switch to Sepolia Network.”
输入地址错误	“Invalid address.”
合约地址错误	“Invalid ERC20 contract.”
8. Build & Deployment（构建与 GitHub Pages 部署）
8.1 Vite 配置（必须加 base）

vite.config.js：

export default defineConfig({
  base: '/erc20-transfer-dapp/',  // GitHub Pages 仓库名
});

8.2 GitHub Pages 部署步骤

GitHub → Settings → Pages

Source 选择：

Deploy from a branch
Branch: gh-pages


在项目根目录执行：

npm run build
git subtree push --prefix dist origin gh-pages


或使用 action：

.github/workflows/deploy.yml

9. Milestones（开发阶段）
MVP — v0.1

Wallet connect

Read token info

Read ERC20 balance

Transfer

v1.0

UI 美化

错误处理 + toast

自动刷新余额

部署到 GitHub Pages

v1.1（可选增强）

添加批量转账 CSV

添加 token list 下拉框

添加交易历史（读取事件）

10. Testing Plan（测试计划）

功能性测试

余额读取正确

decimals 转换正确

转账功能正常

Wrong chain 错误提示正常

输入校验

地址格式

数量必须 > 0

合约地址必须 42 字符

UI 测试

Loading 状态

错误提示是否清楚

11. Repository Structure（项目文件结构）
/
├─ src/
│  ├─ components/
│  │   ├─ WalletConnect.jsx
│  │   ├─ TokenInfo.jsx
│  │   ├─ TransferForm.jsx
│  │   └─ TxResult.jsx
│  ├─ lib/
│  │   └─ abi.js
│  ├─ App.jsx
│  └─ main.jsx
├─ public/
├─ spec.md
├─ package.json
├─ vite.config.js
└─ README.md

12. License

MIT License