<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center">
  <img alt="Stability Nexus" src="public/orglogo.svg" width="175">
  &nbsp;
  &nbsp;
  <img src="public/plusSign.svg" width="30" height="175" />
  &nbsp;
  &nbsp;
  <img src="public/Benelogo.svg" width="175" />
</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/Stability_Nexus-/Bene-228B22?style=for-the-badge&labelColor=FFC517)](https://bene-evm.stability.nexus/)

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
<!-- Telegram -->
<a href="https://t.me/StabilityNexus">
<img src="https://img.shields.io/badge/Telegram-black?style=flat&logo=telegram&logoColor=white&logoSize=auto&color=24A1DE" alt="Telegram Badge"/></a>
&nbsp;&nbsp;
<!-- X (formerly Twitter) -->
<a href="https://x.com/StabilityNexus">
<img src="https://img.shields.io/twitter/follow/StabilityNexus" alt="X (formerly Twitter) Badge"/></a>
&nbsp;&nbsp;
<!-- Discord -->
<a href="https://discord.gg/YzDKeEfWtS">
<img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&logoSize=auto&label=Discord&labelColor=5865F2&color=57F287" alt="Discord Badge"/></a>
&nbsp;&nbsp;
<!-- Medium -->
<a href="https://news.stability.nexus/">
  <img src="https://img.shields.io/badge/Medium-black?style=flat&logo=medium&logoColor=black&logoSize=auto&color=white" alt="Medium Badge"></a>
&nbsp;&nbsp;
<!-- LinkedIn -->
<a href="https://linkedin.com/company/stability-nexus">
  <img src="https://img.shields.io/badge/LinkedIn-black?style=flat&logo=LinkedIn&logoColor=white&logoSize=auto&color=0A66C2" alt="LinkedIn Badge"></a>
&nbsp;&nbsp;
<!-- Youtube -->
<a href="https://www.youtube.com/@StabilityNexus">
  <img src="https://img.shields.io/youtube/channel/subscribers/UCZOG4YhFQdlGaLugr_e5BKw?style=flat&logo=youtube&logoColor=white&logoSize=auto&labelColor=FF0000&color=FF0000" alt="Youtube Badge"></a>
</p>



&nbsp;

<!-- Project core values and objective -->
<p align="center">
  <strong>
 Bene allows project owners to raise funds for their projects and to reward funders with Proof-of-Funding tokens.
  </strong>
</p>

---

# Bene-Fundraising-EVM-Frontend

This a frontend to interact with Bene's smart contracts at 
[https://github.com/StabilityNexus/Bene-FundRaising-EVM-Contracts](https://github.com/StabilityNexus/Bene-FundRaising-EVM-Contracts)

A live deployment of this frontend has been deployed to [https://bene-evm.stability.nexus/](https://bene-evm.stability.nexus/).

## 🔒 Decentralized Wallet Integration

This project uses **fully decentralized wallet connections** without relying on WalletConnect/ReOwn SDKs. This design choice enhances the project's "unstoppability" and resilience by:

- ❌ **No centralized projectId** required
- ❌ **No usage limits** or rate limiting from external services
- ❌ **No potential censorship** risk from third-party providers
- ✅ **Direct wallet connections** via browser extensions
- ✅ **Works offline** once connected

### Supported Wallets

- **Injected Wallets**: MetaMask, Brave Wallet, Trust Wallet, and any browser extension wallet
- **Coinbase Wallet**: Direct SDK integration without WalletConnect

### Supported Networks

The application supports 20+ EVM chains including:
- Citrea Testnet (primary)
- Ethereum Mainnet & Sepolia
- Polygon & Mumbai
- Arbitrum & Sepolia
- Optimism & Sepolia
- Base & Sepolia
- BSC & Testnet
- Avalanche & Fuji
- And more...

## Running this Frontend Locally

### Clone the Repository

```bash
git clone https://github.com/StabilityNexus/Bene-FundRaising-EVM-Frontend
cd Bene-FundRaising-EVM-Frontend
```

### Install Dependencies

```bash
npm install

```

### Start the Development Server

```bash
npm run dev
```

This will start a development server, and the frontend will be accessible at http://localhost:5173/.

