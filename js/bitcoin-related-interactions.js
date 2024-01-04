const web3 = require('web3');
const preCompiled = require('@rsksmart/rsk-precompiled-abis');
const bitcoinjs = require('bitcoinjs-lib');

const url = "https://public-node.testnet.rsk.co";

const bridgeInstance = preCompiled.bridge.build(new web3.Web3(url));

function ensure0x(value) {
  return !value.startsWith('0x') ? '0x' + value : value;
}

(async () => {
  const btcBlockchainBestChainHeight = await bridgeInstance.methods.getBtcBlockchainBestChainHeight().call();
  console.log(`BTC blockchain best chain height: ${btcBlockchainBestChainHeight}`);

  const btcBlockchainBestBlockHeader = await bridgeInstance.methods.getBtcBlockchainBestBlockHeader().call();
  console.log(`\ngetBtcBlockchainBestBlockHeader: ${btcBlockchainBestBlockHeader}`);

  const bufferedHeader = Buffer.from(btcBlockchainBestBlockHeader.substr(2), 'hex');
  const bitcoinjsBlock = bitcoinjs.Block.fromHex(bufferedHeader);
  const blockHash = bitcoinjsBlock.getHash().reverse().toString('hex');
  console.log(`\nblock hash => ${blockHash}`);

  const btcBlockchainBlockHeaderByHash = await bridgeInstance.methods.getBtcBlockchainBlockHeaderByHash(ensure0x(blockHash)).call();
  console.log(`\ngetBtcBlockchainBlockHeaderByHash: ${btcBlockchainBlockHeaderByHash}`);
  console.log(`Tip of the chain header equals to searching header by hash? ${btcBlockchainBestBlockHeader === btcBlockchainBlockHeaderByHash}`);

  const btcBlockchainBlockHeaderByHeight = await bridgeInstance.methods.getBtcBlockchainBlockHeaderByHeight(btcBlockchainBestChainHeight).call();
  console.log(`\ngetBtcBlockchainBlockHeaderByHeight: ${btcBlockchainBlockHeaderByHeight}`);
  console.log(`Tip of the chain header equals to searching header by height? ${btcBlockchainBestBlockHeader === btcBlockchainBlockHeaderByHeight}`);

  const btcBlockchainParentBlockHeaderByHash = await bridgeInstance.methods.getBtcBlockchainParentBlockHeaderByHash(ensure0x(blockHash)).call();
  console.log(`\ngetBtcBlockchainParentBlockHeaderByHash: ${btcBlockchainParentBlockHeaderByHash}`);
  const parentBlock = bitcoinjs.Block.fromHex(Buffer.from(btcBlockchainParentBlockHeaderByHash.substr(2), 'hex'));
  console.log(`Tip of the chain header parent equals to searching parent by hash? ${bitcoinjsBlock.prevHash.toString('hex') == parentBlock.getHash().toString('hex')}`);


  // TODO: missing some interactions (e.g. getBtcTransactionConfirmations)
})();
