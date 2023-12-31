'use client';

import './globals.css';
import { Poppins } from 'next/font/google';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { gnosis, mainnet, goerli, sepolia } from 'wagmi/chains';
import { Box } from '@chakra-ui/react';

import { Analytics } from '@vercel/analytics/react';

import { Providers } from './providers';
import { WALLETCONNECT_PROJECT_ID } from './config';

const poppins = Poppins({ subsets: ['latin'], weight: '500' });

const projectId = WALLETCONNECT_PROJECT_ID;

const chains = [gnosis, mainnet, goerli, sepolia];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <WagmiConfig config={wagmiConfig}>
          <Providers>
            <Box>
              {children}
              <Analytics />
            </Box>
          </Providers>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </body>
    </html>
  );
}
