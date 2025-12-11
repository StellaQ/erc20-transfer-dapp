/**
 * 2.5 Transaction Result Panel（交易结果面板）
 * 显示：
 * 交易 hash（可点击跳转区块浏览器）
 * 区块号
 * Gas used
 * 状态提示
 */
import { useTransactionReceipt } from 'wagmi'

export function TxResult({ hash }) {
  const { data: receipt, isLoading, error } = useTransactionReceipt({
    hash,
  })

  if (!hash) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Transaction Result</h2>

      {isLoading && <p>Loading transaction details...</p>}

      {error && (
        <p className="text-red-500 text-sm">Error loading transaction: {error.message}</p>
      )}

      {receipt && (
        <div className="space-y-2">
          <p>
            <strong>Transaction Hash:</strong>{' '}
            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {hash}
            </a>
          </p>
          <p><strong>Block Number:</strong> {receipt.blockNumber?.toString()}</p>
          <p><strong>Gas Used:</strong> {receipt.gasUsed?.toString()}</p>
          <p><strong>Status:</strong> {receipt.status === 'success' ? 'Success' : 'Failed'}</p>
        </div>
      )}
    </div>
  )
}