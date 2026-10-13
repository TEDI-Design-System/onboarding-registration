import { Footer, Header, Link, Text } from '@tedi-design-system/react/tedi';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps): JSX.Element => {
  return (
    <div className="page-layout">
      <Header>
        <Header.Logo href="https://www.tedi.ee" logo={<img src="/TEDI-logo-sinine.svg" width={97} height={32} alt="TEDI" />} />
      </Header>
      {children}
      <Footer>
        <Footer.Bottom>
          <Text element="span" color="white">
            Lehte haldab{' '}
            <Link href="https://www.tedi.ee" target="_blank" rel="noopener noreferrer" color="inverted">
              TEDI
            </Link>
          </Text>
        </Footer.Bottom>
      </Footer>
    </div>
  );
};
