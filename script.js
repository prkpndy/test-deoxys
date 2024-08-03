document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');

    fetch('http://localhost:9944', {method: "POST", body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "starknet_getBlockWithTxHashes",
            "params": {
                "block_id": "latest"
            },
            "id": 1
        }),
        headers: {
            "Content-Type": "application/json"
        }})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayJSON(data);
        })
        .catch(error => {
            resultDiv.textContent = `Error: ${error.message}`;
        });

    function displayJSON(data) {
        const formattedJSON = JSON.stringify(data, null, 2);
        resultDiv.textContent = formattedJSON;
    }
});