const {ethers}=require("hardhat")

const enterRuffle = async () => {
      const raffle = await ethers.getContract("Raffle")
      const entranceFee = await raffle.getEntranceFee()
      await raffle.enterRaffle({ value: entranceFee + 1 })
      console.log("Entered!")
}

enterRuffle()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
