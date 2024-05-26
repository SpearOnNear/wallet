document.getElementById('connect-wallet').addEventListener('click', async () => {
  try {
    // Access the global namespaces
    const setupWalletSelector = window.walletSelectorCore.setupWalletSelector;
    const setupMeteorWallet = window.walletSelectorMeteorWallet.setupMeteorWallet;

    // Ensure the methods are available
    if (!setupWalletSelector || !setupMeteorWallet) {
      throw new Error("Required methods are not available.");
    }

    // Setup the wallet selector with Meteor Wallet
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMeteorWallet()]
    });

    const wallet = await selector.wallet();
    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    console.log("Signed in with accounts:", accounts);
  } catch (error) {
    console.error("Error during wallet setup or sign-in:", error);
  }
});
