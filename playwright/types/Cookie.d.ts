type Cookie = {
    readonly name: string;
    readonly value: string;
    readonly url?: string;
    readonly domain?: string;
    readonly path?: string;
    readonly expires?: number;
    readonly httpOnly?: boolean;
    readonly secure?: boolean;
    readonly sameSite?: 'Strict' | 'Lax' | 'None';
}

export default Cookie;