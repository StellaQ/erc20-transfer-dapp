/**
 * 2.1 Wallet Connection（钱包连接）
 * 支持 MetaMask 等 EVM 钱包连接
 * 显示当前钱包地址
 * 显示当前网络信息
 * 钱包未连接时禁用所有读写操作
 */
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = (connector) => {
    connect({ connector })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (isConnected) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Wallet Connected</h2>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Network:</strong> {chain?.name || 'Unknown'}</p>
          {chain?.id !== sepolia.id && (
            <p className="text-red-500 text-sm">Please switch to Sepolia Network</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Connect Wallet</h2>
      <div className="space-y-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            disabled={isPending}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isPending ? 'Connecting...' : `Connect ${connector.name}`}
          </button>
        ))}
      </div>
    </div>
  )
}