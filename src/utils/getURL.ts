import canUseDOM from './canUseDOM';

export const getServerSideURL = () => {
  // 1. Explicit configuration takes highest priority (set this in Vercel env vars)
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    const value = process.env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '');
    return value.startsWith('http') ? value : `https://${value}`;
  }

  // 2. Use Vercel's production URL when in production environment
  const vercelEnv = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL && vercelEnv === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`;
  }

  // 3. Fall back to deployment-specific URL (preview deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
};

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ''}`;
  }

  // 1. Explicit configuration takes highest priority
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL;
  }

  // 2. Use Vercel's production URL when in production environment
  const vercelEnv = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL && vercelEnv === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // 3. Fall back to deployment-specific URL (preview deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return '';
};
