/**
 * Wagmi v2 配置
 * 支持 Sepolia 测试网
 * 连接器：injected, metaMask
 * 注意：WalletConnect 需要有效的 projectId，暂时移除以避免错误
 */
import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    // walletConnect({
    //   projectId: 'your-project-id', // 需要有效的 WalletConnect project ID
    // }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})