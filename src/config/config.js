var CryptoJS = require("crypto-js");
var dataEncryptionKey = 'mAeUgGaKaDdDaKuGEnC123';

export const ENV = {

    default_network: process.env.REACT_APP_DEFAULT_NETWORK,
    url: process.env.REACT_APP_BASE_URL,
    baseUrl: process.env.REACT_APP_URL,
    // primayTokenVal: process.env.REACT_APP_PRIMARY_TOKEN_VALUE,
    defaultCurrency: "USD",
    primaryTokenName: "TRI",

    // Headers
    Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
    x_auth_token: process.env.REACT_APP_X_AUTH_TOKEN,

    uploadedImgPath: `${process.env.REACT_APP_ASSETS_BASE_URL}images/`,
    secretKey: process.env.REACT_APP_SECRET_KEY,
    x_access_token: localStorage.getItem("accessToken"),

    //Blockchain related variables
    chainsConfigs: {
        5: {
            nativeCurrency: {
                name: 'Goerli',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            explorer: "https://goerli.etherscan.io/",
            eventKey: 'Goerli',
            title: 'Goerli',
            networkName: 'Goerli Testnet',
            primaryToken: {
                address: "0xE4081e46D8B851f3bd606eFA11eA7F46fB5eF735",
                valueInUsd: 1
            },
            ownerAddress: "0x564C37233eDC7F3C11418Fda93aeCcC9ABB3f625",
            ownerPrivateKey: "daa6eabf766615c4eddb03fd33a51083856154dc8560df9e310648f661fb1414"
        },
        97: {
            nativeCurrency: {
                name: 'Binance',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
            explorer: "https://testnet.bscscan.com/",
            eventKey: 'Binance',
            title: 'Binance',
            networkName: 'Binance Testnet',
            primaryToken: {
                address: "0xE4081e46D8B851f3bd606eFA11eA7F46fB5eF735",
                valueInUsd: 1
            },
            ownerAddress: "0x564C37233eDC7F3C11418Fda93aeCcC9ABB3f625",
            ownerPrivateKey: "daa6eabf766615c4eddb03fd33a51083856154dc8560df9e310648f661fb1414"
        },
        56: {
            nativeCurrency: {
                name: 'Binance',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
            explorer: "https://testnet.bscscan.com/",
            eventKey: 'Binance',
            title: 'Binance',
            networkName: 'Binance Testnet',
            primaryToken: {
                address: "0xE4081e46D8B851f3bd606eFA11eA7F46fB5eF735",
                valueInUsd: 1
            },
            ownerAddress: "0x564C37233eDC7F3C11418Fda93aeCcC9ABB3f625",
            ownerPrivateKey: "daa6eabf766615c4eddb03fd33a51083856154dc8560df9e310648f661fb1414"
        },
        1: {
            nativeCurrency: {
                name: 'EThereum',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            explorer: "https://goerli.etherscan.io/",
            eventKey: 'Ethereum',
            title: 'Ethereum',
            networkName: 'Goerli Testnet',
            primaryToken: {
                address: "0xE4081e46D8B851f3bd606eFA11eA7F46fB5eF735",
                valueInUsd: 1
            },
            ownerAddress: "0x564C37233eDC7F3C11418Fda93aeCcC9ABB3f625",
            ownerPrivateKey: "daa6eabf766615c4eddb03fd33a51083856154dc8560df9e310648f661fb1414"
        },
    },

    // will remove this
    requiredChainName: process.env.REACT_APP_REQUIRED_CHAIN_NAME,
    // will remove this
    requiredChainIds: [parseInt(process.env.REACT_APP_ETH_CHAIN)],
    // will remove this
    networks: { [parseInt(process.env.REACT_APP_ETH_CHAIN)]: process.env.REACT_APP_ETH_CHAIN },
    // will remove this
    nativeCurrencies: {
        [parseInt(process.env.REACT_APP_ETH_CHAIN)]: {
            name: process.env.REACT_APP_ETH_NAME,
            symbol: process.env.REACT_APP_ETH_CURRENCY_SYMBOL,
            decimals: parseInt(process.env.REACT_APP_ETH_CURRENCY_DECIMALS),
        },
    },

    //set user in local storage
    encryptUserData: function (data) {
        data = JSON.stringify(data);
        var encryptedUser = CryptoJS.AES.encrypt(data, dataEncryptionKey).toString();
        localStorage.setItem('encuse', encryptedUser);
        return true;
    },

    encryptUserBal: function (data) {
        data = JSON.stringify(data);
        var encryptedBal = CryptoJS.AES.encrypt(data, dataEncryptionKey).toString();
        localStorage.setItem('encbal', encryptedBal);
        return true;
    },

    getBalanceKeys: function (keys = null) {
        let balance = localStorage.getItem('encbal');
        if (balance) {
            var bytes = CryptoJS.AES.decrypt(balance, dataEncryptionKey);
            var originalBalance = bytes.toString(CryptoJS.enc.Utf8);
            originalBalance = JSON.parse(originalBalance);
            return originalBalance;
        }
    },


    //return required keys
    getUserKeys: function (keys = null) {
        let userData = localStorage.getItem('encuse');
        if (userData) {
            var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
            var originalData = bytes.toString(CryptoJS.enc.Utf8);
            originalData = JSON.parse(originalData);
            let user = {};
            if (keys) {
                keys = keys.split(" ");
                for (let key in keys) {
                    let keyV = keys[key];
                    user[keyV] = originalData[keyV];
                }
            }
            else {
                user = originalData;
            }
            return user;
        } else {
            return {};
        }

    },

    // will use this to clear the session on logout buttons
    //clear everything from localstorage
    clearStorage: function () {
        localStorage.clear()
        localStorage.removeItem('encuse');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('encbal');
    },

    objectToQueryString: function (body) {
        const qs = Object.keys(body).map(key => `${key}=${body[key]}`).join('&');
        return qs;
    },

    // will remove this
    web3Providers: {
        [parseInt(process.env.REACT_APP_ETH_CHAIN)]: process.env.REACT_APP_ETH_RPC,
    },

    // will remove this
    explorers: {
        [parseInt(process.env.REACT_APP_ETH_CHAIN)]: process.env.REACT_APP_ETH_EXPLORER,
    },

    //will remove this
    contractAddress: {
        token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
        ownerWalletAddress: process.env.REACT_APP_OWNER_WALLET_ADDRESS,
        ownerWalletPrivateKey: process.env.REACT_APP_OWNER_WALLET_PRIVATE_KEY
    },

    //will remove
    //set active user type in local storage
    encryptActiveUserType: function (data) {
        data = JSON.stringify(data);
        var encryptedUser = CryptoJS.AES.encrypt(data, dataEncryptionKey).toString();
        localStorage.setItem('aut', encryptedUser);
        return true;
    },

    //will remove
    //get active user type from local storage
    getActiveUserType: function () {
        let userTypeData = localStorage.getItem('aut');
        if (userTypeData) {
            var bytes = CryptoJS.AES.decrypt(userTypeData, dataEncryptionKey);
            var userType = bytes.toString(CryptoJS.enc.Utf8);
            return parseInt(userType);
        }
        return 0;
    },

    // will remove
    //decode passed data
    decodePassedData: function (data) {
        var bytes = CryptoJS.AES.decrypt(data, dataEncryptionKey);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    },

    // will remove
    isValidImageType: function (file) {
        if (file && file.type) {
            const acceptableTypes = ['image/png', 'image/x-png', 'image/jpeg', 'image/jpg']
            return (acceptableTypes.includes(file.type.toLowerCase()))
        }
    },

    // will remove
    integerNumberValidator: function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        const specialKeys = [46, 8, 9, 27, 13, 110]

        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
        if (specialKeys.includes(e.keyCode) ||
            // Allow: Ctrl+A,Ctrl+C,Ctrl+Z,Ctrl+X Command+A
            ((e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 90 || e.keyCode === 88) && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    },

    decimalNumberValidator: function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        let specialKeys = [46, 8, 9, 27, 13, 110, 190]

        if (e.target.value.includes('.')) {
            specialKeys = [46, 8, 9, 27, 13]
        }
        else {
            specialKeys = [46, 8, 9, 27, 13, 110, 190]
        }

        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
        if (specialKeys.includes(e.keyCode) ||
            // Allow: Ctrl+A,Ctrl+C,Ctrl+Z,Ctrl+X Command+A
            ((e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 90 || e.keyCode === 88) && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) ||
            // Allow F1 to F12 keys 
            (e.keyCode >= 112 && e.keyCode <= 123)
        ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

    },

    // will remove
    truncTextareaLength: (val, maxlength = 150) => {
        // maxlength = 150

        if (val.length > maxlength) {
            val = (val.substring(0, maxlength)).concat('...')
        } else if ((val.match(/\n/g) || []).length) {
            let values = val.split('\n')

            if (values && values.length && values[0] !== '\n')
                val = values[0].concat('...')
        }

        return val
    },

    accountLevelsPointsLimit: {
        bronzeMinPoints: 10,
        silverMinPoints: 20,
        goldMinPoints: 30,
        platinumMinPoints: 40,
    }
}
