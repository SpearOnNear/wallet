// script.js
document.addEventListener('DOMContentLoaded', () => {
  const connectWalletButton = document.getElementById('connectWalletButton');
  // const signTransactionButton = document.getElementById('signTransactionButton');
  // const mainPage = document.getElementById('mainPage');
  // const successPage = document.getElementById('successPage');
  // const transactionPage = document.getElementById('transactionPage');
  // const accountIdElement = document.getElementById('accountId');
  // const publicKeyElement = document.getElementById('publicKey');
  // const transactionHashesElement = document.getElementById('transactionHashes');

  connectWalletButton.addEventListener('click', () => {
    // const successUrl = encodeURIComponent(window.location.origin + window.location.pathname);
    // const connectUrl = `https://testnet.wallet.mintbase.xyz/connect?success_url=${successUrl}`;
    // window.location.href = connectUrl;

    if (window.vuplex) {
      // The window.vuplex object already exists, so go ahead and send the message.
      sendMessageToCSharp();
  } else {
      // The window.vuplex object hasn't been initialized yet because the page is still
      // loading, so add an event listener to send the message once it's initialized.
      window.addEventListener('vuplexready', sendMessageToCSharp);
  }
  });


  //   signTransactionButton.addEventListener('click', () => {
  //     const signerId = 'matrix-harrison.testnet';
  //     const receiverId = 'beat_koloth.testnet';
  //     const deposit = '100000000000000000000'; // Amount in yoctoNEAR (1 NEAR)
      
  //     const _actions = [{
  //       type: "Transfer",
  //       params: {
  //         deposit: deposit
  //       },
  //     }];

  //     const transferTransaction = [{
  //       receiverId,
  //       signerId,
  //       actions: _actions
  //     }];

  //     const encodedTransactionData = encodeURIComponent(encodeURI (JSON.stringify(transferTransaction)));
  //     const callbackUrl = encodeURIComponent(window.location.origin + window.location.pathname);
  //     const signTransactionUrl = `https://testnet.wallet.mintbase.xyz/sign-transaction?transactions_data=${encodedTransactionData}&callback_url=${callbackUrl}`;
  //     window.location.href = signTransactionUrl;
  // });

  // const urlParams = new URLSearchParams(window.location.search);
  // const accountId = urlParams.get('account_id');
  // const publicKey = urlParams.get('public_key');
  // const transactionHashes = urlParams.get('transactionHashes');

  // if (accountId && publicKey) {
  //   mainPage.style.display = 'none';
  //   successPage.style.display = 'block';

  //   accountIdElement.textContent = `Account ID: ${accountId}`;
  //   publicKeyElement.textContent = `Public Key: ${publicKey}`;


  
  function sendMessageToCSharp() {
      // This object passed to postMessage() automatically gets serialized as JSON
      // and is emitted via the C# MessageEmitted event. This API mimics the window.postMessage API.
      window.vuplex.postMessage({ type: 'data', message: {
        accountID:"my account id",
        key: "publicKey"
      } });
  }


  class VuplexPolyfill {
    constructor() {
      this._listeners = {};
      window.addEventListener('message', this._handleWindowMessage.bind(this));
    }
  
    addEventListener(eventName, listener) {
      if (!this._listeners[eventName]) {
        this._listeners[eventName] = [];
      }
      if (this._listeners[eventName].indexOf(listener) === -1) {
        this._listeners[eventName].push(listener);
      }
    }
  
    removeEventListener(eventName, listener) {
      if (!this._listeners[eventName]) {
        return;
      }
      const index = this._listeners[eventName].indexOf(listener);
      if (index !== -1) {
        this._listeners[eventName].splice(index, 1);
      }
    }
  
    postMessage(message) {
      // Don't pass a string to JSON.stringify() because it adds extra quotes.
      const messageString = typeof message === 'string' ? message : JSON.stringify(message);
      parent.postMessage({
        type: 'vuplex.postMessage',
        message: messageString
      }, '*')
    }
  
    _emit(eventName, ...args) {
      if (!this._listeners[eventName]) {
        return;
      }
      for (const listener of this._listeners[eventName]) {
        try {
          listener(...args);
        } catch (error) {
          console.error(`An error occurred while invoking the '${eventName}' event handler.`, error);
        }
      }
    }
  
    _handleWindowMessage(event) {
      if (event.data && event.data.type === 'vuplex.postMessage') {
        this._emit('message', { data: event.data.message });
      }
    };
  }
  
  if (!window.vuplex) {
    window.vuplex = new VuplexPolyfill();
  }
  }


 

  // if (transactionHashes) {
  //   successPage.style.display = 'none';
  //   transactionPage.style.display = 'block';

  //   transactionHashesElement.textContent = `Transaction Hashes: ${transactionHashes}`;
  // }}
);
