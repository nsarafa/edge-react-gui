// @flow
// import { renameWalletStart } from ''
// import RNFS from 'react-native-fs'

// const path = RNFS.DocumentDirectoryPath + '/api.txt'

export const renameWalletRequest = (wallet: any, name: string) => wallet.renameWallet(name)
  .then(() => {
    Promise.resolve(wallet)
  })

export const getTransactions = (wallet: any, currencyCode: string) => wallet.getTransactions({currencyCode})

export const setTransactionDetailsRequest = (wallet: any, currencyCode: string, transactionDetails: any) => {
  console.log('wallet is: ', wallet)
  console.log('currencyCode is: ', currencyCode)
  console.log('transactionDetails: ', transactionDetails)
  //  parameters should be txid, currencyCode, and then metaData
  return wallet.saveTxMetadata(transactionDetails.txid, currencyCode, transactionDetails)
}

export function getReceiveAddress (wallet: any, currencyCode: string)  {
  let newReceiveAddress = wallet.getReceiveAddress({currencyCode})
  console.log('inside of api->getReceiveAddress, wallet.id + ', wallet.id, ' + currencyCode: ', currencyCode, ' newReceiveAddress is: ', newReceiveAddress)
  // RNFS.writeFile(path, 'inside api->getReceiveAddress, newReceiveAddress is: ' + newReceiveAddress, 'utf8')
  return newReceiveAddress
}


export const makeSpend = (wallet: any, spendInfo: any) => {
  console.log('spendInfo', spendInfo)
  return wallet.makeSpend(spendInfo)
}

export const getBalance = (wallet: any, currencyCode: string) => {
  const balance = wallet.getBalance({currencyCode})
  return balance
}

export const enableTokens = (wallet: any, tokens: Array<string>) =>
  // XXX need to hook up to Core -paulvp
   wallet.enableTokens(tokens)

export const parseURI = (wallet: any, uri: string) => wallet.parseUri(uri)

export const signTransaction = (wallet: any, unsignedTransaction: any) => wallet.signTx(unsignedTransaction)

export const broadcastTransaction = (wallet: any, signedTransaction: any) => wallet.broadcastTx(signedTransaction)

export const saveTransaction = (wallet: any, signedTransaction: any) => wallet.saveTx(signedTransaction)

// Documented but not implemented in the core
// Do not use for Glidera transactions
// export const signBroadcastAndSaveTransaction = (wallet:any, unsignedTransaction:any) => {
//   return wallet.signBroadcastAndSaveTransactionTx(unsignedTransaction)
// }
