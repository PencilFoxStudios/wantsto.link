/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
interface ImportMetaEnv {
    readonly DATABASE_URL: string;
    readonly VITE_ENV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}