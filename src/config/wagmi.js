/**
 * Wagmi v2 配置
 * 支持 Sepolia 测试网
 * 连接器：injected, metaMask, walletConnect
 */
import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'your-project-id', // Replace with your WalletConnect project ID
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})