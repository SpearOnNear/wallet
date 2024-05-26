document.getElementById('connect-wallet').addEventListener('click', async () => {
  const { setupWalletSelector } = window["@near-wallet-selector/core"];
  const { setupMeteorWallet } = window["@near-wallet-selector/meteor-wallet"];

  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [setupMeteorWallet()]
  });

  const wallet = await selector.wallet();
  const accounts = await wallet.signIn({ contractId: "test.testnet" });

  console.log("Signed in with accounts:", accounts);
});
