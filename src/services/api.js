export const fetchAmounts = async (currency) => {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/59e23b9a4c12bf3d20a86096/latest/${currency}`)
        const amount = await response.json()
        console.log(amount)
        return amount
    } catch (error) {
        console.error(`Error : ${error.message}`)
    }
}
