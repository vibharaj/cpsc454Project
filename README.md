Group: Vibha Rajagopalan, Dalisa Nguyen, Erik Truong, Kevin Nguyen

- Install NodeJS `v14.15.4`

- Install truffle `v5.2.4` and Ganache

   npm install -g truffle

- Install the Metamask browser extension

- How to run the project:
   - Clone the repository
   - Command line:
      - cd cpsc454project

   - open Ganache
      - Out of the addresses, the first one will be used for the Admin account on Metamask, and the others can be used for the user accounts
      - Get the private key for the respective address and use it to import the accounts onto Metamask

   - Go back to the command line and use the following command to import smart contracts into Ethereum:
      - truffle migrate
      
   - Then: cd client
   - Finally do: npm start
