const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site-internal link with the deploy base and a trailing slash: href('a/b') → '/guides/a/b/'. */
export function href(path = ''): string {
  const p = path.replace(/^\/+|\/+$/g, '');
  return p ? `${base}/${p}/` : `${base}/`;
}
