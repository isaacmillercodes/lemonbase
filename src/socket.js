export function subscribeToAddress(address) {
	const btcs = new WebSocket('wss://ws.blockchain.info/inv');

	btcs.onopen = function() {
		const message = JSON.stringify({"op":"addr_sub", "addr": address})
		btcs.send(message);
	};

	btcs.onmessage = function(onmsg) {

		const getTransactionUSD = async (value, time) => {
			const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
			const data = await response.json();
			const rate = data.bpi.USD.rate_float
			const valueInUSD = (value * rate).toFixed(2);
			return valueInUSD;
		}

		const response = JSON.parse(onmsg.data);

		const payment = response.x.out.find(transaction => transaction.addr === address);

		if (payment) {
			const unixTime = response.x.time;
			const unixDateObj = new Date(unixTime * 1000);
			const time = unixDateObj.toLocaleString();
			const satoshiValue = payment.value / 100000000;
			getTransactionUSD(satoshiValue, unixTime).then(transactionUSD => {
				const transaction = { address, time, satoshiValue, transactionUSD }
				return transaction;
			});
		}

	};
}

export default { subscribeToAddress };
