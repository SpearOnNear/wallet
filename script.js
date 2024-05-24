// script.js
document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connectWalletButton');
    const mainPage = document.getElementById('mainPage');
    const successPage = document.getElementById('successPage');
    const accountIdElement = document.getElementById('accountId');
    const publicKeyElement = document.getElementById('publicKey');
  
    connectWalletButton.addEventListener('click', () => {
      const successUrl = encodeURIComponent(window.location.origin + window.location.pathname);
      const connectUrl = `https://testnet.wallet.mintbase.xyz/connect?success_url=${successUrl}`;
      window.location.href = connectUrl;
    });
  
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('account_id');
    const publicKey = urlParams.get('public_key');
  
    if (accountId && publicKey) {
      mainPage.style.display = 'none';
      successPage.style.display = 'block';
  
      accountIdElement.textContent = `Account ID: ${accountId}`;
      publicKeyElement.textContent = `Public Key: ${publicKey}`;
    }
  });
  