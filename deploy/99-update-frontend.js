const { ethers, network } = require("hardhat")
const fs = require("fs")
const FRONTEND_ADDRESSES_FILE =
    "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
const FRONTEND_ABI_FILE = "../nextjs-smartcontract-lottery-fcc/constants/abi.json"
module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating front end")
        updateContractAddresses()
        updateAbi()
    }
}
async function updateAbi(){
    const raffle=await ethers.getContract("Raffle")
    fs.writeFileSync(FRONTEND_ABI_FILE,raffle.interface.format(ethers.utils.FormatTypes.json))
}
async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const contractAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId].includes(raffle.address)) {
            contractAddresses[chainId].push(raffle.address)
        }
    } else {
        contractAddresses[chainId] = [raffle.address]
    }
    fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(contractAddresses))
}

module.exports.tags=["all","frontend"]