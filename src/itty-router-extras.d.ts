// Helpers

interface BaseRouterOptions {
  base?: string;
}

type ThrowableRouterOptions = BaseRouterOptions & { stack?: boolean };

interface CorsOptions {
  origin?: string;
  methods?: string;
  headers?: string;
  credentials?: boolean;
}

export function ThrowableRouter(options?: ThrowableRouterOptions): typeof Proxy;

// Response
export function json(obj: object): Response;
export function status(status: number, message: string | object): Response;
export function error(status?: number, content?: string | object): Response;
export function missing(message?: string | object): Response;
export function text(message: string, options?: ResponseInit): Response;

// MiddleWare
export function withContent(request: Request): void;
export function withCookies(request: Request): void;
export function withCors(options?: CorsOptions): Response;
export function withParams(request: Request): void;

export class StatusError {
  status?: number;
  constructor(status?: number, message?: string);
}
