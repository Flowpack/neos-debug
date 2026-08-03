interface Window {
    __enable_neos_debug: (setCookie?: boolean) => void;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

type QueryDetails = {
    executionTimeSum: number;
    count: number;
    params: {
        [key: string]: any;
    };
};

type SQLQueryString = string;
type SQLTableName = string;

type CacheInfo = {
    mode: 'uncached' | 'cached' | 'dynamic';
    hit?: boolean;
    created: Date | string;
    markup?: string;
    fusionPath: string;
    fusionObject: string;
    renderMetrics: {
        renderTime: string;
        sqlQueryCount: number;
    };
    entryIdentifier: Record<string, any>;
    entryTags: string[];
    lifetime: null | number;
    parentNode: HTMLElement;
};

type QueryGroup = {
    queries: {
        [key: SQLQueryString]: QueryDetails;
    };
    executionTimeSum: number;
    count: number;
};

type SlowQuery = {
    executionMS: number;
    params: {
        [key: string]: any;
    };
    sql: SQLQueryString;
    table: SQLTableName;
    types: number[];
};

type SearchQuery = {
    className: string;
    methodName: string;
    executionTime: number;
};

type DebugInfos = {
    renderTime: number;
    startRenderAt: number;
    endRenderAt: number;
    sqlData: {
        queryCount: number;
        executionTime: number;
        slowQueries: SlowQuery[];
        tables: {
            [key: SQLTableName]: {
                queryCount: number;
                executionTime: number;
            };
        };
        groupedQueries: {
            [key: SQLTableName]: QueryGroup;
        };
    };
    resourceStreamRequests: NeosResource[];
    thumbnails: ThumbnailMetrics;
    cCacheHits: number;
    // TODO: Create type for cache misses
    cCacheMisses: string[];
    cCacheUncached: number;
    // TODO: Define type for collected data
    additionalMetrics: {
        messages: CustomMessages;
        cacheAccess: CacheAccessMetrics;
        searchQueries: SearchQuery[];
        [key: string]: object;
    };
};

type ThumbnailMetrics = Record<string, string[]>;

type CacheAccessMetrics = {
    [key: string]: {
        cacheIdentifier: string;
        cacheType: string;
        hits: number;
        misses: number;
        updates: number;
    };
};

type CustomMessages = {
    timestamp: number;
    message: string;
    title: string;
}[];

type NeosResource = {
    sha1: string;
    filename: string;
    collectionName: string;
};

type DebugAttributeMetricEntry = {
    label: string;
    fusionPath: string;
    fusionObjectName: string;
    count: number;
    totalTime: number;
    minTime: number;
    maxTime: number;
    avgTime: number;
};

type Overlays = 'cache' | 'query' | 'inspection' | 'additionalMetrics';
