// script.js
document.addEventListener('DOMContentLoaded', () => {
  const connectWalletButton = document.getElementById('connectWalletButton');
  const signTransactionButton = document.getElementById('signTransactionButton');
  const mainPage = document.getElementById('mainPage');
  const successPage = document.getElementById('successPage');
  const transactionPage = document.getElementById('transactionPage');
  const accountIdElement = document.getElementById('accountId');
  const publicKeyElement = document.getElementById('publicKey');
  const transactionHashesElement = document.getElementById('transactionHashes');

  connectWalletButton.addEventListener('click', () => {
    const successUrl = encodeURIComponent(window.location.origin + window.location.pathname);
    const connectUrl = `https://testnet.wallet.mintbase.xyz/connect?success_url=${successUrl}`;
    window.location.href = connectUrl;
  });

  signTransactionButton.addEventListener('click', () => {
    const transactionsData = { /* your transaction data here */ };
    const encodedTransactionData = encodeURIComponent(JSON.stringify(transactionsData));
    const callbackUrl = encodeURIComponent(window.location.origin + window.location.pathname);
    const signTransactionUrl = `https://testnet.wallet.mintbase.xyz/sign-transaction?transactions_data=${encodedTransactionData}&callback_url=${callbackUrl}`;
    window.location.href = signTransactionUrl;
  });

  const urlParams = new URLSearchParams(window.location.search);
  const accountId = urlParams.get('account_id');
  const publicKey = urlParams.get('public_key');
  const transactionHashes = urlParams.get('transactionHashes');

  if (accountId && publicKey) {
    mainPage.style.display = 'none';
    successPage.style.display = 'block';

    accountIdElement.textContent = `Account ID: ${accountId}`;
    publicKeyElement.textContent = `Public Key: ${publicKey}`;
  }

  if (transactionHashes) {
    successPage.style.display = 'none';
    transactionPage.style.display = 'block';

    transactionHashesElement.textContent = `Transaction Hashes: ${transactionHashes}`;
  }
});
