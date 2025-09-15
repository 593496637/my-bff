declare module 'koa-nunjucks-2' {
  import { Context, Next } from 'koa';

  interface NunjucksOptions {
    ext?: string;
    path?: string | string[];
    writeResponse?: boolean;
    functionName?: string;
    configure?: any;
    nunjucksConfig?: {
      trimBlocks?: boolean;
      [key: string]: any;
    };
  }

  function nunjucks(options?: NunjucksOptions): (ctx: Context, next: Next) => Promise<void>;

  export = nunjucks;
}