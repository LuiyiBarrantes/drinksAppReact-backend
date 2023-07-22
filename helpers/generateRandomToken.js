module.exports = () =>{
    const randomNum = Math.random()
    const randomString = randomNum.toString(32)
    const random = randomString.substring(2)
    const date = Date.now().toString(32)

    return random + date
}