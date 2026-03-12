import type { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

// This is the root layout. It just wraps the children.
// The actual layout with metadata and providers is in [locale]/layout.tsx
export default function RootLayout({ children }: Props) {
  return children;
}
