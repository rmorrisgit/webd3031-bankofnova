import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* ✅ Add this so the title appears visibly on the page */}
      {title && <h1>{title}</h1>}
      
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
