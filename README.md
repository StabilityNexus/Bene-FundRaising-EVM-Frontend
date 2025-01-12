# Bene: Fundraising Platform

## Overview

Bene: Fundraising Platform is a decentralized application (DApp) that enables projects to receive funding in exchange for Proof of funding tokens. This DApp allows projects to request ETH(native currency of the network) in exchange for Proof of funding tokens.

#### Smart Contracts Repository:

(https://github.com/StabilityNexus/BenefactionPlatform-EVM)

#### Live Website URL

(https://bene-evm.stability.nexus)

### How it Works

- Each project contains two tokens:

  1.  **Proof-of-Funding Token Vouchers (PFTV)**: This token is minted during the project creation transaction and serves a main purposes:

      - **Contribution Tracking**: Temporarily, contributors receive this token when participating in the project. Once it is confirmed that a refund is no longer possible, contributors can exchange the PFTV for the **Proof-funding Token (PFT)**.
      - The total supply of PFTV equals the total issuance of PFT.

  2.  **Proof-funding Token (PFT)**: Unlike the PFTV, the PFT is not minted on the contract. It represents the project or its organization and may also reflect proof-funding for similar projects within the same organization. PFTs are distributed only after refund conditions are no longer applicable, ensuring proper tracking.

> The use of the PFTV ensures that during refunds, the origin of the token can be reliably traced to the current project. If PFTs were distributed immediately upon purchase, distinguishing whether a token originated from the current project or another related project would not be possible.

- Project owners can create a funding vault that holds an amount of tokens, which may vary, setting a **timestamp** as a deadline.
- A minimum amount of tokens must be sold before the project can withdraw funds. This ensures that the project receives sufficient backing.
- If the timestamp is reached before minimum amount of tokens are sold, users have the option to exchange their tokens back for the corresponding ETHs, provided the minimum has not been reached.

## Parameters of a funding vault

- **timestamp**: The timestamp limit until withdrawal or refund is allowed.
- **Minimum Funding Amount**: The minimum number of ETH needs to be raised to enable withdrawals or refunds.
- **Proof of funding Token Address**: The smart contract address for the Proof-of-Funding token (e.g., 0x123...abc)
- **Proof of funding Token Amount**: Total Proof of funding tokens for the vault
- **ETH/Token Exchange Rate**: The exchange rate of ETHs per token.
- **withdrawal Address**: The address to withdraw funds after raised successfully.
- **Project Title**: Title of the Project
- **Project URL**: URL of the Project
- **Project Description**: Description of the Project

### Constants

The following constants are defined in the contract:

- **Protocol Treasury Address** (`dev_addr`): The base58 address of the developer.
- **Protocol Fee** (`dev_fee`): The percentage fee taken by the developer (e.g., `5` for 5%).

## Processes

The Bene: Fundraising Platform supports seven main processes:

1. **funding vault Creation**:

   - Allows anyone to create a funding vault with the specified script and parameters.
   - The funding vault represents the project's request for funds in exchange for a specific amount of tokens.
   - The tokens in the funding vault are provided by the funding vault creator, that is, the project owner.

2. **Token Acquisition**:

   - Users are allowed to exchange ETHs for **Proof of Funding Token Vouchers (PFTVs)** (at exchange rate) until there are no more tokens left, even if the deadline has passed.
   - Users receive PFTVs in their own funding vaultes, which adhere to token standards, making them visible and transferable through ETH wallets.

3. **Refund Tokens**:

   - Users are allowed to exchange PFTVs for ETHs (at the exchange rate) if and only if the deadline has passed and the minimum number of tokens has not been sold.
   - This ensures that participants can retrieve their contributions if the funding goal is not met.

4. **Withdraw ETHs**:

   - Project owners are allowed to withdraw ETHs if and only if the minimum number of tokens has been sold.
   - Project owners can only withdraw to the address specified in `withdrawal_address`.

5. **Withdraw Unsold Tokens**:

   - Project owners are allowed to withdraw unsold PFTs from the contract at any time.
   - Project owners can only withdraw to the address specified in `withdrawal_address`.

6. **Add Tokens**:

   - Project owners are allowed to add more PFTVs to the contract at any time.

7. **Redeem Tokens**:
   - Users are allowed to exchange **Proof of Funding Token Vouchers (PFTVs)** for **Proof-funding Tokens (PFTs)** if and only if the deadline has passed and the minimum number of tokens has been sold.

## Usage

You can interact with the platform using the following webpage:

(https://bene-evm.stability.nexus/)

## Installation

## Prerequisites

- **Node.js and npm (or yarn):** Ensure you have the latest versions installed. You can download them from the [official Node.js website](https://nodejs.org/).
- **Code Editor:** Choose a code editor like [Visual Studio Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or [WebStorm](https://www.jetbrains.com/webstorm/).

## Steps

### Clone the Repository

```bash
git clone https://github.com/your-username/benefactionevm.git
cd benefactionevm
```

### Install Dependencies

```bash
npm install

```

### Start the Development Server

```bash
npm run dev
```

This will start a development server, and your project will be accessible at http://localhost:5173/.
