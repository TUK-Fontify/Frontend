type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown> | null;
};

type ImportMetaWithEnv = ImportMeta & {
  env?: Record<string, string | undefined>;
};

const env = (import.meta as ImportMetaWithEnv).env ?? {};

export const API_BASE_URL =
  env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:8000/api/v1';

const DEV_USER_ID = env.VITE_DEV_USER_ID ?? 'dev-user-001';

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

function buildUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (response.status === 204) return null;
  if (contentType.includes('application/json')) return response.json();
  return response.text();
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const body = options.body;

  if (!(body instanceof FormData) && body != null && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  if (!headers.has('x-user-id')) {
    headers.set('x-user-id', DEV_USER_ID);
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
    body:
      body instanceof FormData || typeof body === 'string' || body == null
        ? body
        : JSON.stringify(body),
  });
  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(response.statusText || 'API request failed', response.status, payload);
  }

  return payload as T;
}
