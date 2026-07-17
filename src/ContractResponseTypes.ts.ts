export interface Vault {
  vaultAddress: string;
  title: string;
  description: string;
  deadline: bigint;
  isERC20: boolean;
}

export type VaultArrayType = Vault[];

export interface VaultDetailsType {
  withdrawalAddress: string;
  proofOfFundingToken: `0x${string}`;
  fundingToken: `0x${string}`;
  proofOfFundingTokenAmount: string;
  minFundingAmount: string;
  timestamp: string;
  exchangeRate: string;
  projectURL: string;
  projectTitle: string;
  projectDescription: string;
}
