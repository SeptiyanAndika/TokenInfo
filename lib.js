const abi = require('./abi.json');
const config = require('./config.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

const tokenInfo = (contractAddress)=>{
    const contract = new web3.eth.Contract(abi,contractAddress);

    let workers = [
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.totalSupply().call(),
        contract.methods.decimals().call()
    ];
    return Promise.all(workers).then(res=>{
        let decimals = res[3];
        let divisor = Math.pow(10,decimals);
        let totalSupply = res[2];
        totalSupply = Number(totalSupply)/divisor;
        return Promise.resolve({
            'name':res[0],
            'symbol':res[1],
            'totalSupply':totalSupply,
            'decimals':decimals,
        })
    }).catch(err=>{
        return Promise.reject(err);
    });
}

const balanceInfo = (contractAddress,userAddress)=>{
    const contract = new web3.eth.Contract(abi,contractAddress);


    let workers = [
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
        contract.methods.balanceOf(userAddress).call()
    ];
    return Promise.all(workers).then(res=>{
        let decimals = res[1];
        let divisor = Math.pow(10,decimals);
        let balance = Number(res[2])/divisor;
        return Promise.resolve({
            'symbol':res[0],
            'balance':balance
        })
    }).catch(err=>{
        return Promise.reject(err);
    });
}

module.exports = {
    tokenInfo,
    balanceInfo
};