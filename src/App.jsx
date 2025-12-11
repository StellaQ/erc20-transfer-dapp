/**
 * 主应用组件
 * 集成所有功能模块：
 * - 钱包连接
 * - Token信息读取
 * - ERC20转账
 * - 交易结果显示
 */
import { useState } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import { WalletConnect } from './components/WalletConnect'
import { TokenInfo } from './components/TokenInfo'
import { TransferForm } from './components/TransferForm'
import { TxResult } from './components/TxResult'
import { ERC20_ABI } from './lib/abi.js'

function App() {
  const { isConnected } = useAccount()
  const [currentTxHash, setCurrentTxHash] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [refreshTokenData, setRefreshTokenData] = useState(() => () => {})

  // Get token decimals for transfer form
  const { data: decimalsData } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'symbol',
      },
    ],
    query: {
      enabled: !!tokenAddress,
    },
  })

  const decimals = decimalsData?.[0]?.result
  const symbol = decimalsData?.[1]?.result

  const handleTransferComplete = (hash) => {
    setCurrentTxHash(hash)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          ERC20 Transfer DApp
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <WalletConnect />

            <TokenInfo
              onTokenAddressChange={setTokenAddress}
              onRefetch={setRefreshTokenData}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TransferForm
              tokenAddress={tokenAddress}
              decimals={decimals}
              symbol={symbol}
              onTransferComplete={handleTransferComplete}
              onRefreshBalance={refreshTokenData}
            />

            <TxResult hash={currentTxHash} />
          </div>
        </div>

        {!isConnected && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Please connect your wallet to start using the DApp
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App