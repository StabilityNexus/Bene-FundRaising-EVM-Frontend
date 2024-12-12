export interface Vault {
  vaultAddress: string;
  title: string;
  description: string;
  deadline: bigint;
}

export type VaultArrayType = Vault[];

export interface VaultDetailsType {
  withdrawlAddress: string;
  participationToken: `0x${string}`;
  participationTokenAmount: string;
  minFundingAmount: string;
  timeStamp: string;
  exchangeRate: string;
  projectURL: string;
  projectTitle: string;
  projectDescription: string;
}
