import Ethereum from '../assets/images/arow-icon.png';
import Binance from '../assets/images/binancelogo.png';
import Fantom from '../assets/images/fantom.png';
import Cronos from '../assets/images/cronos.png';
require('dotenv').config();
const CryptoJS = require("crypto-js");
const dataEncryptionKey = 'kalsaOOLLaASASAFFSSEE';
const moment = require('moment');
const { toast } = require('react-toastify');

export const ENV = {
    pixulToken: process.env.REACT_APP_PIXUL_TOKEN,
    transferFundUrl: {
        ethFundTranfer: process.env.REACT_APP_ETHEREUM_FUND_TRANSFER,
        fantomFundTranfer: process.env.REACT_APP_FANTOM_FUND_TRANSFER,
        cronosFundTranfer: process.env.REACT_APP_CRONOS_FUND_TRANSFER,
        binanceFundTranfer: process.env.REACT_APP_BINANCE_FUND_TRANSFER,
    },
    numberToChainId: {
        4: 338,
        3: 4002,
        2: 97,
        1: 4,
    },
    defaultChainId: parseInt(process.env.REACT_APP_REQUIRED_CHAIN),
    chainsConfigs: {
        4: {
            number: 1,
            nativeCurrency: {
                name: 'Rinkeyby',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrl: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            explorer: "https://rinkeby.etherscan.io/",
            eventKey: 'Ethereum',
            title: 'Ethereum',
            networkName: 'Rinkeby Testnet',
            currencyImage: Ethereum,
            marketplaceAddress: "0x29f3398445afce69f6De011D33b471F43651a792",
            NFT721Address: "0xC6d155FC56e1e1eCC0233572a8734641B0d57874",
            NFT1155Address: "0x5966C19e5D9aF08B4a1F1c7f935649c8595A95fa"
        },
        97: {
            number: 2,
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
            currencyImage: Binance,
            marketplaceAddress: "0x80ff102a6510D7706fe9e424C1713B8FB3D764E1",
            NFT721Address: "0x3a42de215A85e41F700e32fbB94F77163C9074Bb",
            NFT1155Address: "0x8831bcDb462915861c6A8286F6F82E6cb804bc4b"
        },
        4002: {
            number: 3,
            nativeCurrency: {
                name: 'Fantom',
                symbol: 'FTM',
                decimals: 18,
            },
            rpcUrl: "https://rpc.testnet.fantom.network",
            explorer: "https://testnet.ftmscan.com/",
            eventKey: 'Fantom',
            title: 'Fantom',
            networkName: 'Fantom Testnet',
            currencyImage: Fantom,
            marketplaceAddress: "0x942D09aD17FDDDD9704d6365d202E16Ad7AE2028",
            NFT721Address: "0x780F09EAecDf5F294BdA03eBC8f8C48536CFE860",
            NFT1155Address: "0x244a85dab35cb3d39359e05dbbeb18bd3e15fc54"
        },
        338: {
            number: 4,
            nativeCurrency: {
                name: 'Cronos',
                symbol: 'CRO',
                decimals: 18,
            },
            rpcUrl: "https://cronos-testnet-3.crypto.org:8545",
            explorer: "https://testnet.cronoscan.com/",
            eventKey: 'Cronos',
            title: 'Cronos',
            networkName: 'Cronos Testnet',
            currencyImage: Cronos,
            marketplaceAddress: "0x2b0d9E8C7312D253fBA8a61680F1087265d8a329",
            NFT721Address: "0xCc61ef226B48365C2526649918c3Cc851183E381",
            NFT1155Address: "0x2C805349D12903206A59F7e1d87Ad549a8B22155"
        }
    },
    chainId: process.env.REACT_APP_REQUIRED_CHAIN,
    domainURL: process.env.REACT_APP_DOMAIN_URL,
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
    url: process.env.REACT_APP_BASE_URL,
    currency: {
        25: 'CRO',
        56: 'BNB',
        97: 'BNB',
        250: 'FTM',
        4002: 'FTM',
        1: 'ETH',
        4: 'ETH'
    },
    appName: process.env.REACT_APP_NAME,
    requiredChainName: {
        338: 'Cronos Testnet',
        25: 'Cronos',
        56: 'Binance',
        97: 'Binance Testnet',
        250: 'Fantom',
        4002: 'Fantom Testnet',
        1: 'Ethereum',
        4: 'Ethereum Testnet'
    },
    amountToApprove: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    currencyFilters: [
        {
            name: 'Ethereum',
            label: 'ETH',
            symbol: 'ETH',
            value: 1,
            icon: 'assets/images/ethereum.svg',
            chainIds: [1, 4]
        },
        {
            name: 'Binance',
            label: 'BNB',
            symbol: 'BNB',
            value: 2,
            icon: 'assets/images/binance.svg',
            chainIds: [56, 97]
        },
        {
            name: 'Fantom',
            label: 'FTM',
            symbol: 'FTM',
            value: 3,
            icon: 'assets/images/fantom.png',
            chainIds: [250, 4002]
        },
        {
            name: 'Cronos',
            label: 'CRO',
            symbol: 'CRO',
            value: 4,
            icon: 'assets/images/cronos.svg',
            chainIds: [25, 338]
        },
        // keep it at last index always
        {
            name: 'US Dollars',
            label: 'USD',
            symbol: 'USD',
            value: -1,
            icon: 'assets/images/usd.png',
            chainIds: null
        }
    ],
    currencies: [
        {
            label: 'WBNB',
            symbol: 'WBNB',
            value: 'WBNB',
            icon: 'assets/images/binance.svg',
            showInBuy: true, // show in make an offer / place a bid modal
            address: process.env.REACT_APP_WBNB_TOKEN
        },
        {
            label: 'WETH',
            symbol: 'WETH',
            value: 'WETH',
            icon: 'assets/images/binance.svg',
            showInBuy: true, // show in make an offer / place a bid modal
            address: process.env.REACT_APP_WETH_TOKEN
        },
        {
            label: 'WCRO',
            symbol: 'WCRO',
            value: 'WCRO',
            icon: 'assets/images/cronos.svg',
            showInBuy: true, // show in make an offer / place a bid modal
            address: process.env.REACT_APP_WCRO_TOKEN
        },
        {
            label: 'WFTM',
            symbol: 'WFTM',
            value: 'WFTM',
            icon: 'assets/images/binance.svg',
            showInBuy: true, // show in make an offer / place a bid modal
            address: process.env.REACT_APP_WFTM_TOKEN
        },
        // {
        //     label: 'BNB',
        //     symbol: 'BNB',
        //     value: 'BNB',
        //     icon: 'assets/images/binance.svg',
        //     showInBuy: true, // show in make an offer / place a bid modal
        //     address: process.env.REACT_APP_WBNB_TOKEN,
        //     abi: wbnbContractAbi
        // },
        // {
        //     label: 'ETH',
        //     symbol: 'ETH',
        //     value: 'ETH',
        //     icon: 'assets/images/binance.svg',
        //     showInBuy: true, // show in make an offer / place a bid modal
        //     address: process.env.REACT_APP_WBNB_TOKEN,
        //     abi: wbnbContractAbi
        // },
        // {
        //     label: 'FTM',
        //     symbol: 'FTM',
        //     value: 'FTM',
        //     icon: 'assets/images/binance.svg',
        //     showInBuy: true, // show in make an offer / place a bid modal
        //     address: process.env.REACT_APP_WBNB_TOKEN,
        //     abi: wbnbContractAbi
        // },
        // {
        //     label: 'CRO',
        //     symbol: 'CRO',
        //     value: 'CRO',
        //     icon: 'assets/images/cronos.svg',
        //     showInBuy: true, // show in make an offer / place a bid modal
        //     address: process.env.REACT_APP_WBNB_TOKEN,
        //     abi: wcroContractAbi
        // },
    ],
    // Headers
    Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
    x_auth_token: process.env.REACT_APP_X_AUTH_TOKEN,
    // default images placeholders
    globalPlaceholderImage: '/img/placeholder.jpg',
    collectionFeaturedImg: '/img/elumntstandardcollectionplaceholder.jpg', //Correct
    userDefaultImg: '/img/avatarplaceholder.jpg', //Correct
    categoryDefaultImg: '/img/placeholder.png',

    //set user in local storage
    encryptUserData: function (data) {
        let userData = localStorage.getItem('encuse');
        if (userData && !data.accessToken) {
            let bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
            let originalData = bytes.toString(CryptoJS.enc.Utf8);
            originalData = JSON.parse(originalData);
            if (originalData && originalData.accessToken) {
                data.accessToken = originalData.accessToken;
            }
        }
        data = JSON.stringify(data);
        let encryptedUser = CryptoJS.AES.encrypt(data, dataEncryptionKey).toString();
        localStorage.setItem('encuse', encryptedUser);
        return true;
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
        }
        return {};
    },

    //Object to query string
    objectToQueryString: function (body) {
        const qs = Object.keys(body).map(key => `${key}=${body[key]}`).join('&');
        return qs;
    },

    //validate image types
    isValidImageType: function (file) {
        if (file && file.type) {
            const acceptableTypes = ['image/png', 'image/x-png', 'image/jpeg', 'image/jpg']
            return (acceptableTypes.includes(file.type.toLowerCase()))
        }
    },

    //slick configurations
    slickSettings: {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    margin: 15,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    },

    dateRangeInitialSettings: {
        startDate: moment(),
        endDate: moment().add(6, 'months').toDate(),
        minDate: moment(),
        maxDate: moment().add(6, 'months').toDate(),
        ranges: {
            '1 Day': [
                moment().toDate(),
                moment().add(1, 'days').toDate(),
            ],
            '3 Days': [
                moment().toDate(),
                moment().add(3, 'days').toDate(),
            ],
            '1 Week': [
                moment().toDate(),
                moment().add(6, 'days').toDate(),
            ],
        }
    },

    countDownRenderer: ({ days, hours, minutes, seconds }) => {
        return (
            <>
                <div className='countdown d-flex  justify-content-start  align-items-center mb-2'>
                    <div className='values'>
                        <h4>Days</h4>
                        <p>{days}</p>
                    </div>
                    <div className='values ml-5'>
                        <h4>Hours</h4>
                        <p>{hours}</p>
                    </div>
                    <div className='values ml-5'>
                        <h4>Minutes</h4>
                        <p>{minutes}</p>
                    </div>
                    <div className='values ml-5'>
                        <h4>Seconds</h4>
                        <p>{seconds}</p>
                    </div>
                </div>
            </>
        )
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

    integerNumberValidator: function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        const specialKeys = [46, 8, 9, 27, 13]

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

    //convert mongoose exponent floating value into valid values
    exponentialToDecimal: (exponential) => {
        let decimal = exponential.toString().toLowerCase();
        if (decimal.includes('e+')) {
            const exponentialSplitted = decimal.split('e+');
            let postfix = '';
            for (
                let i = 0; i <
                +exponentialSplitted[1] -
                (exponentialSplitted[0].includes('.') ? exponentialSplitted[0].split('.')[1].length : 0); i++
            ) {
                postfix += '0';
            }
            const addCommas = text => {
                let j = 3;
                let textLength = text.length;
                while (j < textLength) {
                    text = `${text.slice(0, textLength - j)},${text.slice(textLength - j, textLength)}`;
                    textLength++;
                    j += 3 + 1;
                }
                return text;
            };
            decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
        }
        if (decimal.toLowerCase().includes('e-')) {
            const exponentialSplitted = decimal.split('e-');
            let prefix = '0.';
            for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
                prefix += '0';
            }
            decimal = prefix + exponentialSplitted[0].replace('.', '');
        }
        return parseFloat(decimal);
    },

    convertXtoY: (val, rateUnit, qty = 1) => {
        return parseFloat((val * qty * rateUnit).toFixed(10)).toFixed(5)
    },

    convertRateToUsd: (value, unit) => {
        return (parseFloat(value) * parseFloat(unit)).toFixed(5);
    },

    convertChainRate: (value, unit) => {
        if (unit !== 0)
            return (value / (unit)).toFixed(5);
    },
    
    config1: {
        price: {
            blockChain: '',
            currency: "",
            amount: "",
        },
        listingSchedule: {
            startDate: moment(),
            endDate: moment().add(6, "months"),
            startTime: moment(new Date()).format("HH:mm"),
            endTime: "23:59",
        },
        reserveFor: "", // if user selects reserve buyer
        quantity: 1
    },
    config2: {
        method: 1, // 1 = Sell to the highest bidder or 2 = Sell with the declining price
        startPrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
        endPrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
        duration: {
            startDate: moment(),
            endDate: moment().add(6, "months"),
            startTime: moment(new Date()).format("HH:mm"),
            endTime: "23:59",
        },
        // if user includes reserve price
        reservePrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
    },
    config3: {
        method: 1, // 1 = Sell to the highest bidder or 2 = Sell with the declining price
        startPrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
        endPrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
        duration: {
            startDate: moment(),
            endDate: moment().add(6, "months"),
            startTime: moment(new Date()).format("HH:mm"),
            endTime: "23:59",
        },
        // if user includes reserve price
        reservePrice: {
            currency: "",
            amount: "",
            blockChain: '',
        },
    },
    tokenStandards: {
        TS1: 'ERC-721',
        TS2: 'ERC-1155'
    },
    formatAddress: (address) => {
        return address ? address.substr(0, 7) + '...' + address.substr(-4) : null;
    },
    copy: (address) => {
        navigator.clipboard.writeText(address)
        toast.success("Address Copied To Clipboard.")
    }
}

