import { kv } from '@vercel/kv';

type RewriteRule = {
  source: string;
  destination: string;
  isPermanent?: boolean;
};

export const rewriteRules: RewriteRule[] = [
  {
    source: '/our-mission',
    destination: '/about'
  },
  {
    source: '/diamond-appointments', 
    destination: '/appointment-landing'
  },
  {
    source: '/diamond-tolerance', 
    destination: '/diamond_tolerance'
  }
];

export function setRewrite(rewrite) {
  const { source, destination, isPermanent = false } = rewrite;

  kv.hset('rewrites', { [source]: destination });
  console.log(`Added Rewrite: ${source} => ${destination}`)
  if (isPermanent) {
    if (isPermanent) kv.sadd(source, 'permanent_rewrites');
  }
}

export function setAllRewrites(rewrites: RewriteRule[]){
  rewrites.forEach((rewrite) => {
    setRewrite(rewrite);
  });
}