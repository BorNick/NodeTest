# NodeTest
## Installation
1. Install [*Node.js*](https://nodejs.org/en/)
1. Install *testrpc*(Test Node) using the followinng command: "**npm install -g ethereumjs-testrpc**"
1. Create a folder for *web3* library(ex. web3)
1. Open it in command prompt
1. Install *web3* npm with the help of "**npm install web3@^0.20.0**" (works on windows)

## Check workability
1. Specify the path path to web3 in the "**test.html**" file
(line 7: "<script src="**path_to_web3**\\dist\web3.js"></script>")
1. Start the test using "**testrpc**"
1. Open the "**test.html**" file in your browser
1. Open browser console (**F12**)
1. If you see an array of accounts, everything works correctly  
It should look like this:  
![Accounts](/images/accounts.png)