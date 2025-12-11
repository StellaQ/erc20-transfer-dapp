/**
 * 2.2 Token Configuration（Token配置）
 * 输入框配置 ERC20 token 合约地址
 * 使用 wagmi 的 useReadContract 自动读取：
 * name()
 * symbol()
 * decimals()
 *
 * 2.3 Balance Reading（余额读取）
 * 使用 useReadContract 调用：
 * balanceOf(address)
 * 将数值从 raw → formatUnits(decimals)
 */
import { useState } from 'react'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'
import { ERC20_ABI } from '../lib/abi.js'

export function TokenInfo({ onTokenAddressChange }) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')

  const { data: tokenData, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'name',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'symbol',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
      },
    ],
    query: {
      enabled: !!tokenAddress && !!address && isConnected,
    },
  })

  const [name, symbol, decimals, balance] = tokenData || []

  const handleLoadToken = () => {
    if (tokenAddress) {
      refetch()
      onTokenAddressChange?.(tokenAddress)
    }
  }

  const formatBalance = (balance, decimals) => {
    if (!balance || !decimals) return '0'
    return formatUnits(balance, decimals)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Token Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Token Contract Address
          </label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
        </div>

        <button
          onClick={handleLoadToken}
          disabled={!tokenAddress || !isConnected || isLoading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Load Token Info'}
        </button>

        {error && (
          <p className="text-red-500 text-sm">Error loading token info: {error.message}</p>
        )}

        {tokenData && (
          <div className="space-y-2">
            <p><strong>Name:</strong> {name?.result || 'N/A'}</p>
            <p><strong>Symbol:</strong> {symbol?.result || 'N/A'}</p>
            <p><strong>Decimals:</strong> {decimals?.result || 'N/A'}</p>
            <p><strong>Your Balance:</strong> {formatBalance(balance?.result, decimals?.result)} {symbol?.result}</p>
          </div>
        )}
      </div>
    </div>
  )
}