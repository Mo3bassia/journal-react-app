import { Helmet } from 'react-helmet-async';

function SEO({ title, description, name, type }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

SEO.defaultProps = {
  title: 'Journal App - Your Digital Diary',
  description: 'A personal journal app to track your daily thoughts and moods',
  name: 'Journal App',
  type: 'website'
};

export default SEO;
