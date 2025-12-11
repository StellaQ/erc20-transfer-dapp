/**
 * 2.4 ERC20 Transfer（ERC20转账）
 * 输入：
 * 目标地址
 * 数量（自动使用 decimals 格式转换）
 * 使用 useWriteContract 调用：
 * transfer(address,uint256)
 * 显示转账状态：
 * Pending
 * Success
 * Failed
 */
import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, isAddress } from 'viem'
import { ERC20_ABI } from '../lib/abi.js'

export function TransferForm({ tokenAddress, decimals, symbol, onTransferComplete, onRefreshBalance }) {
  const { isConnected } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const { data: hash, writeContract, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleTransfer = async () => {
    // 验证输入
    if (!tokenAddress) {
      alert('Please load token information first.')
      return
    }

    if (!recipient) {
      alert('Please enter recipient address.')
      return
    }

    if (!isAddress(recipient)) {
      alert('Please enter a valid Ethereum address.')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount greater than 0.')
      return
    }

    if (!decimals) {
      alert('Token decimals not loaded. Please reload token information.')
      return
    }

    try {
      const parsedAmount = parseUnits(amount, decimals)
      writeContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient, parsedAmount],
      })
    } catch (err) {
      console.error('Transfer error:', err)
      alert('Transfer failed: ' + err.message)
    }
  }

  // Reset form on successful transfer and refresh balance
  if (isConfirmed && onTransferComplete) {
    onTransferComplete(hash)
    setRecipient('')
    setAmount('')
    // Refresh balance after successful transfer
    if (onRefreshBalance) {
      setTimeout(() => onRefreshBalance(), 2000) // Wait 2 seconds for transaction to be mined
    }
  }

  const isDisabled = !isConnected || !tokenAddress || !recipient || !amount || isPending || isConfirming

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Transfer Tokens</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Amount ({symbol || 'Tokens'})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            min="0"
            step="0.000001"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
        </div>

        <button
          onClick={handleTransfer}
          disabled={isDisabled}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Send Tokens'}
        </button>

        {error && (
          <p className="text-red-500 text-sm">Error: {error.message}</p>
        )}

        {isConfirmed && (
          <p className="text-green-500 text-sm">Transfer successful!</p>
        )}
      </div>
    </div>
  )
}