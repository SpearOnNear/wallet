document.addEventListener('DOMContentLoaded', () => {
  const signTransactionButton = document.getElementById('continuebtn');
  const accountIdElement = document.getElementById('accountId');

  const urlParams = new URLSearchParams(window.location.search);
  const accountId = urlParams.get('account_id');

  if (accountId) {
    accountIdElement.value = accountId;
  }

  console.log(accountIdElement.value)

  signTransactionButton.addEventListener('click', () => {
    const data = {
      type:'connection',
      status:'success',
      walletId: accountId
    }
    const tg = window.Telegram.WebApp;
    tg.sendData(JSON.stringify(data));
  });

  
});
