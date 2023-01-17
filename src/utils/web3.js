import Web3 from 'web3';
import trgTokenABI from '../utils/abi/trgToken.json';
import erc20ABI from '../utils/abi/erc20.json';
import { ENV } from '../config/config';
import { toast } from 'react-toastify';
import store from './../store'
import { emptyError } from '../redux/shared/error/error.action';
import { UPDATE_PROFILE, GET_ERRORS, CREATE_HISTORY, BEFORE_STAKE_AMOUNT, SET_WALLET_ERROR } from '../redux/types'
import { ethers } from 'ethers'
import Contract from 'web3-eth-contract';

const { default_network, chainsConfigs, contractAddress, web3Providers, requiredChainIds, } = ENV

const call = (method, params) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        method(...params)
            .call()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const send = (method, params, from, value) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        method(...params)
            .send({ from, value })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const methods = {
    call,
    send,
};

export const getWeb3 = () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        return web3;
    }
    else {
        return false;
    }
}

export const connectMetamask = async (web3 = null) => {
    if (!web3) {
        web3 = getWeb3();
    }
    if (!web3 || !window.ethereum) {
        store.dispatch(setWalletError("Please install Metamask Wallet in order to use all features of Marketplace"));
        return;
    }

    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (!requiredChainIds.includes(chainId)) {
        store.dispatch(setWalletError(`Please switch to ${ENV.requiredChainName} in order to use all features of Marketplace`));
    }
    return accounts[0];
}

export const signRequest = async () => {
    if (window.ethereum) {
        const web3 = getWeb3();
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const signature = await handleSignMessage(address);
        return signature;
    }
    else {
        alert("Please install Metamask in order to use all features of Marketplace");
    }
}

const setWalletError = (message) => {
    return {
        type: SET_WALLET_ERROR,
        payload: message
    }
}

const accountsChangedHandler = () => {
    let error = `Please switch to ${ENV.requiredChainName} in order to use all features of Marketplace`
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            // localStorage.clear()
            store.dispatch(setWalletError(""))
            store.dispatch(disconnectUser({ "connectedWalletAddress": null }))
        })
        window.ethereum.on('chainChanged', function (_chainId) {
            let chaindId = parseInt(_chainId, 16);
            if (requiredChainIds.includes(chaindId)) {
                store.dispatch(setWalletError(""));
                localStorage.removeItem("walletError")
            }
            else {
                store.dispatch(setWalletError(error));
                localStorage.setItem("walletError", error)
            }
        })
        let web3 = new Web3(window.ethereum)
        web3.eth.net.getId().then((e) => {
            if (requiredChainIds.includes(e)) {
                store.dispatch(setWalletError(""));
                localStorage.removeItem("walletError")
            } else {
                store.dispatch(setWalletError(error));
                localStorage.setItem("walletError", error)
            }
        })
    }
}

const handleSignMessage = (address) => {
    return new Promise((resolve, reject) => {
        const web3 = getWeb3();
        web3.eth.personal.sign(
            web3.utils.fromUtf8(`${ENV.appName} uses this cryptographic signature in place of a password, verifying that you are the owner of this address.`),
            address,
            (err, signature) => {
                if (err) return reject(err);
                return resolve(signature);
            }
        )
    });
};

const getWeb3Instance = (networkId) => {
    let web3 = new Web3(chainsConfigs[networkId].rpcUrl); //rpc according to the network id
    return web3
}

// sign the wallet
const signWallet = async (privateKey) => {
    const signers = await new ethers.Wallet(privateKey);
    return signers
}

export const weitoEth = async (amount) => {
    const web3 = await getWeb3();
    if (!web3 || !amount) {
        return 0;
    }
    const etherValue = await web3.utils.fromWei(`${amount}`, 'ether');
    return etherValue;
}

export const getCurrentBlockNumber = async () => {
    const web3 = getWeb3();
    if (!web3) {
        toast.error("No web3 instance found");
        return false;
    }
    let currentBlockNumber = await web3.eth.getBlockNumber();
    return currentBlockNumber;
}

// disconnect user data
export const disconnectUser = (body, method = 'PUT') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/edit-profile`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            data.data["accessToken"] = localStorage.getItem("accessToken")
            ENV.encryptUserData(data.data)
            dispatch({
                type: UPDATE_PROFILE,
                payload: { user: data.data, message: data.message }
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
}
export const getStakedAmountFn = async(tokenAddress) => {
    const stakedData = await getStakedAmount(`tokenAddress=${tokenAddress}`)
    let totalAmountStaked = stakedData?.totalAmountStaked
    return totalAmountStaked
}

export const getBalanceOfToken = async (networkId, tokenAddress, walletAddress) => {
    return new Promise(async (resolve, reject) => {
        const stakedData = await getStakedAmount(`tokenAddress=${tokenAddress}`)

        let totalAmountStaked = stakedData?.totalAmountStaked
        const web3 = await getWeb3Instance(networkId);
        if (!web3) {
            toast.error("No web3 instance found");
            reject(false)
            return false
        }
        try {
            if (tokenAddress === "0x0") {
                const balance = await web3.eth.getBalance(walletAddress)
                const balanceInEth = await web3.utils.fromWei(`${balance}`, 'ether'); //await weitoEth(balance, networkId)
                resolve(balanceInEth - totalAmountStaked)
                return balanceInEth - totalAmountStaked
            } else {
                let tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);
                const balance = await methods.call(tokenContract.methods.balanceOf, [walletAddress]);
                const balanceInEth = await web3.utils.fromWei(`${balance}`, 'ether'); //await weitoEth(balance, networkId)

                resolve(balanceInEth - totalAmountStaked)
                return balanceInEth - totalAmountStaked
            }
        } catch (e) {
            return false;
        }
    })
}

export const ownerTrgBalance = async () => {
    try {
        let tokenContract = null
        let balance = null
        let balanceInEth = null
        if (default_network === "testnet") {
            const web3 = await getWeb3Instance(5);
            if (!web3) {
                toast.error("No web3 instance found");
                return false;
            }
            tokenContract = new web3.eth.Contract(trgTokenABI, chainsConfigs[5]?.primaryToken?.address);
            balance = await methods.call(tokenContract.methods.balanceOf, [chainsConfigs[5]?.ownerAddress]);
            balanceInEth = await web3.utils.fromWei(`${balance}`, 'ether'); //await weitoEth(balance)
        } else {
            const web3 = await getWeb3Instance(1);
            if (!web3) {
                toast.error("No web3 instance found");
                return false;
            }
            tokenContract = new web3.eth.Contract(trgTokenABI, chainsConfigs[1]?.primaryToken?.address);
            balance = await methods.call(tokenContract.methods.balanceOf, [chainsConfigs[1]?.ownerAddress]);
            balanceInEth = await web3.utils.fromWei(`${balance}`, 'ether'); //await weitoEth(balance)
        }
        return balanceInEth;
    }
    catch (e) {
        return false;
    }
}

// seecondary token to primary token exhange function
export const tokenExchangeFn = async (tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokensAmountToTranfer, trgTokenAmounttoTransfer) => {
    try {

        // calculate gas fee 
        const gasLimit = await calculateGasFee(tokenAddress, networkId, tokenWalletAddress, tokensAmountToTranfer)
        
        const res = await sendGasFee(gasLimit, tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress)

        // send token from tokenWallet to owner address 
        const tx1 = await sendTx(tokenAddress, erc20ABI, tokensAmountToTranfer, tokenWalletAddress, tokenWalletPrivateKey, chainsConfigs[networkId].ownerAddress, networkId, 3)
        if (tx1.status) {
            // send primary token from owner address to the token wallet on swap  
            const tx2 = await sendTx(chainsConfigs[default_network === "testnet" ? 5 : 1].primaryToken.address, trgTokenABI, trgTokenAmounttoTransfer, chainsConfigs[default_network === "testnet" ? 5 : 1].ownerAddress, chainsConfigs[default_network === "testnet" ? 5 : 1].ownerPrivateKey, tokenWalletAddress, default_network === "testnet" ? 5 : 1, 3)
            return tx2
        } else {
            console.log("ERROR = ", tx1)
        }
    } catch (e) {
        return false;
    }
}

// calculate gas fee for the transaction
export const calculateGasFee = async (tokenAddress, networkId, tokenWalletAddress, tokensAmountToTranfer) => {

    if (tokenAddress === "0x0") {
        const web3 = await getWeb3Instance(networkId)
        const gasPrice = await web3.eth.getGasPrice()
        let tokensAmountWei = await web3.utils.toWei(`${tokensAmountToTranfer}`, 'ether');
        let txCount = await web3.eth.getTransactionCount(tokenWalletAddress);
        const gasLimit = await web3.eth.estimateGas({
            from: tokenWalletAddress,
            nonce: txCount,
            data: null,
            value: tokensAmountWei
        })
        return gasLimit * gasPrice
    } else {
        let tokenContract = new Contract(erc20ABI, tokenAddress);
        const web3 = await getWeb3Instance(networkId)
        const gasPrice = await web3.eth.getGasPrice()

        let tokensAmountWei = await web3.utils.toWei(`${tokensAmountToTranfer}`, 'ether');
        const myData = await tokenContract.methods.transfer(chainsConfigs[networkId].ownerAddress, tokensAmountWei).encodeABI();
        let txCount = await web3.eth.getTransactionCount(tokenWalletAddress);
        const gasLimit = await web3.eth.estimateGas({
            from: tokenWalletAddress,
            nonce: txCount,
            to: tokenAddress,
            data: myData,
        })
        return gasLimit * gasPrice
    }
}

// send sign transaction 
const sendTx = async (contractAddress, contractABI, amount, senderAddress, senderPrivateKey, receiverAddress, networkId, historyType) => {
    return new Promise(async (resolve, reject) => {
        if (contractAddress === "0x0") {
            console.log("*** Native Token Case ***")
            // when there is native currency and contract address is 0x0
            const web3 = await getWeb3Instance(networkId)
            let amountInWei = await web3.utils.toWei(`${amount}`, 'ether');

            const signTx = await web3.eth.accounts.signTransaction({
                to: receiverAddress,
                value: amountInWei,
                gas: 2000000
            }, senderPrivateKey)

            await web3.eth.sendSignedTransaction(signTx.rawTransaction).then((receipt) => {
                resolve({ status: true, tx: receipt })
            }).catch(e => {
                reject({ status: false, tx: null })
            })
        } else {
            const signer = await signWallet(senderPrivateKey);
            const web3 = await getWeb3Instance(networkId)
            let contract = new Contract(contractABI, contractAddress);

            let amountInWei = await web3.utils.toWei(`${amount}`, 'ether');
            const data = await contract.methods.transfer(receiverAddress, amountInWei).encodeABI();
            let txCount = await web3.eth.getTransactionCount(senderAddress);
            const gas = await web3.eth.getGasPrice();
            const gasLimit1 = await web3.eth.estimateGas({
                from: senderAddress,
                nonce: txCount,
                to: contractAddress,
                data: data,
            })

            await signer.signTransaction({
                "nonce": web3.utils.toHex(txCount),
                "gasLimit": web3.utils.toHex(gasLimit1),
                "gasPrice": web3.utils.toHex(gas),
                "from": senderAddress,
                "to": contractAddress,
                "data": web3.utils.toHex(data),
            })
                .then(async res => {
                    let promises = [];
                    let tx = null
                    promises.push(web3.eth.sendSignedTransaction(res, async (err, txResult) => {
                        tx = txResult;
                        let body = {
                            senderAddress,
                            receiverAddress,
                            historyType: historyType,
                            amountSent: amountInWei,
                            referralCurrency: contractAddress,
                            gasFee: gas,
                            txHash: tx,
                        }
                        await insertHistory(body)

                        resolve({ status: true, tx: tx })
                    }));
                    await Promise.all(promises)
                })
                .catch(e => {
                    reject({ status: false, tx: null })
                })
        }
    })
}

// we will check whether the token wallet address have 2x amount of the gas
// will check the balance of that token wallet address and then transfer the remaining amount of gas but accumulation would be the 2x of the gas fee which will be consumed for the transaction 
const sendGasFee = async (gasLimit, tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress) => {

    const web3 = await getWeb3Instance(networkId)
    let gasNeedToTransfer = gasLimit

    return new Promise(async (resolve, reject) => {
        let tokenAsGas = await calculateTokenAmount(tokenAddress, gasNeedToTransfer)
        tokenAsGas = await web3.utils.fromWei(`${tokenAsGas}`, 'ether'); //await weitoEth(tokenAsGas)
        if(tokenAsGas !== 0){
            // console.log("Step 4 - Send Token As Gas")
            // console.log("tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokenAsGas")
            // console.log(tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokenAsGas)
            // const tokenGasTx = await sendTokenAsGas(tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokenAsGas)
            // console.log("Send Token As Gas Tx  =", tokenGasTx)
        }
        const signTx = await web3.eth.accounts.signTransaction({
            to: tokenWalletAddress,
            value: gasNeedToTransfer,
            gas: 2000000
        }, chainsConfigs[networkId].ownerPrivateKey)

        await web3.eth.sendSignedTransaction(signTx.rawTransaction).then((receipt) => {
            resolve({ status: true, tx: receipt })
        }).catch(e => {
            reject({ status: false, tx: null })
        })
    })
}

// send gas in token to admin from user wallet address 
const sendTokenAsGas = async(tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokensAmountToTranfer) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send token from tokenWallet to owner address 
            const tx1 = await sendTx(tokenAddress, erc20ABI, tokensAmountToTranfer, tokenWalletAddress, tokenWalletPrivateKey, chainsConfigs[networkId].ownerAddress, networkId, 6) //6 type for gass token transfer
            resolve(tx1)
        } catch (e) {
            reject(false)
        }
    })
}

// calculate amount of token according to the value of eth send as a gas fee 
// amount (gas consumed)
const calculateTokenAmount = (tokenAddress, amount) => {
    // call the api to get the latest value of token symbol 
    return new Promise(async (resolve, reject) => { 

        // get the token value from token address
        const url = `${ENV.url}currencyCap/get`;
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': ENV.Authorization,
                'x-auth-token': ENV.x_auth_token,
                'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(async (data) => {
            if (data.success) {
                let tokenSymbol = null 
                for (let index = 0; index < data.data.walletList.length; index++) {
                    let e = data.data.walletList[index];
                    if(e.walletAddress == tokenAddress){
                        tokenSymbol = e.symbol
                    }
                }
                let currencyCap = data.data.currencyCap
                // token value 
                let tokenValue = currencyCap[`${tokenSymbol}InUSD`] || 1
                if (amount === 0) {
                    resolve(0)
                } else {
                    let amountToBeTransfer = tokenValue * amount
                    resolve(amountToBeTransfer)
                }
            } else {
                reject(false)
            }
        }).catch(error => {
            if (error.response && error.response.data) {
                const { data } = error.response
                if (data.message)
                    console.log("Error : ", data.message)
            }
        })
    })
}

const getStakedAmount = (query, method = 'GET') => {
    return new Promise(async (resolve, reject) => {

        let url = `${ENV.url}stake/getAmount`;

        if (query) {
            url += `?${query}`
        }

        fetch(url, {
            method,
            headers: {
                'Authorization': ENV.Authorization,
                'x-auth-token': ENV.x_auth_token,
                'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(data => {
            if (data.success) {
                resolve(data.data)
            } else {
                store.dispatch({
                    type: GET_ERRORS,
                    payload: data
                })
                reject()
            }
        }).catch(error => {
            if (error.response && error.response.data) {
                const { data } = error.response
                if (data.message) { }
            }
            store.dispatch({
                type: GET_ERRORS,
                payload: error
            })
            reject()
        })
    })
}

// withdrawal token to the receiver address
export const tokenWithdrawal = async (tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress, tokensAmountToTranfer, receiverWalletAddress) => {
    try {
        // calculate gas fee 
        const gasLimit = await calculateGasFee(tokenAddress, networkId, tokenWalletAddress, tokensAmountToTranfer)

        const res = await sendGasFee(gasLimit, tokenAddress, networkId, tokenWalletPrivateKey, tokenWalletAddress)

        // send token from uers wallet address to receiver address 
        const tx1 = await sendTx(tokenAddress, erc20ABI, tokensAmountToTranfer, tokenWalletAddress, tokenWalletPrivateKey, receiverWalletAddress, networkId, 2)
        if (tx1.status) {
            return tx1
        } else {
            console.log("ERROR = ", tx1)
        }
    } catch (e) {
        console.log("Error = ", e);
        return false;
    }
}

// get locked TRI
export const getLockedTRI = async (tokenAddress) => {
    const stakedData = await getStakedAmount(`tokenAddress=${tokenAddress}`)
    let totalAmountStaked = stakedData?.totalAmountStaked
    return totalAmountStaked
}

const insertHistory = async (body, method = 'POST') => {
    // dispatch(emptyError());
    let url = `${ENV.url}history/create`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            // dispatch({
            //     type: CREATE_HISTORY,
            //     payload: { history : data.historyObj }
            // })
        } else {
            console.log("data.message", data.message)
            // toast.error(data.message)
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: data
            // })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                // toast.error(data.message)
                console.log("data.message", data.message)
        }
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: error
        // })
    })
}


accountsChangedHandler();

