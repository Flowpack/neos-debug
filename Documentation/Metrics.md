# Metrics Reference

This document explains every metric collected and displayed by Flowpack.Neos.Debug, how it is gathered server-side, and where it appears in the debug panel.

## Status Bar Metrics

These metrics are always visible in the status bar at the bottom-right of the page.

### Total Render Time

- **What it measures:** The total time spent rendering the Fusion view, from the start of `FusionView::render()` to its completion.
- **How it is collected:** An around-advice on `Neos\Neos\View\FusionView::render()` measures wall-clock time and stores it as `renderTime` in the debug data blob.
- **Where it appears:** Status bar (left side, in ms), and as the `processRequest` metric in the Server-Timing header.

### SQL Query Count

- **What it measures:** Total number of SQL queries executed during the request.
- **How it is collected:** The `DebugStack` SQL logger wraps Doctrine's DBAL logging and increments a counter for each query.
- **Where it appears:** Status bar next to the SQL button, and in the SQL panel summary.

### Slow Query Count

- **What it measures:** Number of SQL queries whose execution time exceeded the configured `sql.slowQueryAfter` threshold (default: 10 ms).
- **How it is collected:** The `DebugStack` compares each query's execution time against the threshold and records slow queries separately.
- **Where it appears:** Status bar next to the SQL button (orange when > 0).

### Cache Hits

- **What it measures:** Number of Fusion content cache segments that returned a cached result.
- **How it is collected:** An around-advice on `ContentCache::getCachedSegment()` counts cache hits.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.

### Cache Misses

- **What it measures:** Number of Fusion content cache segments that did not have a cached result and had to be rendered fresh.
- **How it is collected:** An around-advice on `ContentCache::getCachedSegment()` records each miss with its fusion path. After rendering, `ContentCache::replaceCachePlaceholders()` counts misses.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.

### Uncached Segments

- **What it measures:** Number of Fusion cache segments configured with `mode = "uncached"` or `"dynamic"` that were evaluated.
- **How it is collected:** The frontend parses all `<!--__NEOS_CONTENT_CACHE_DEBUG__` comment nodes and counts entries that are not `cached`.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.

### Additional Metrics Badge

- **What it measures:** Total number of custom debug messages (from `MessagesCollector`).
- **How it is collected:** The `MessagesCollector` accumulates messages via its static `addMessage()` API.
- **Where it appears:** Status bar badge on the Additional Metrics button.

---

## SQL Panel Metrics

### Total Execution Time

- **What it measures:** Sum of execution times across all SQL queries executed during the request.
- **How it is collected:** Each query's timing is recorded by the `DebugStack` SQL logger and summed after the request.
- **Where it appears:** SQL panel summary line.

### Per-Table Breakdown

- **What it measures:** Query count and total execution time grouped by database table name.
- **How it is collected:** The `DebugStack` parses the `FROM` clause of each SQL query via regex and groups statistics by extracted table name.
- **Where it appears:** SQL panel as expandable table groups, sorted by total execution time (descending).

### Per-Query Details

- **What it measures:** Individual SQL query strings with their execution time, call count, and per-parameter-set breakdown.
- **How it is collected:** The `DebugStack` stores each query's SQL string, parameters, types, and timing. After the request, queries are grouped by table name and then by SQL string, with execution time sums and count per unique parameter set.
- **Where it appears:** SQL panel as rows within each table group, expandable to show parameter details.

### Slow Query Detection

- **What it measures:** Individual queries or parameter sets whose execution time exceeded the `sql.slowQueryAfter` threshold.
- **How it is collected:** The `DebugStack` compares each query's execution time against the configured threshold. Both the aggregate query and individual parameter sets can be flagged.
- **Where it appears:** SQL panel with a warning icon on affected queries and parameter sets.

### Parameter Analysis

- **What it measures:** For each unique SQL query, how many times each distinct parameter set was used and the combined execution time per set.
- **How it is collected:** Queries are grouped by SQL string, and within each group, parameters are JSON-serialized to identify unique sets.
- **Where it appears:** SQL panel as expandable "Calls by parameters" rows within each query.

---

## Cache Panel Metrics

### Cache Entry Mode

- **What it measures:** The cache mode of each Fusion segment (`cached`, `uncached`, or `dynamic`).
- **How it is collected:** The `ContentCacheSegmentAspect` injects metadata into HTML comments (`<!--__NEOS_CONTENT_CACHE_DEBUG__`), including the mode field.
- **Where it appears:** Cache panel table with color-coded borders (green = cached, yellow = dynamic, red = uncached).

### Cache Hit Status

- **What it measures:** Whether a cached segment was a cache hit or miss.
- **How it is collected:** The `ContentCacheSegmentAspect` tracks `ContentCache::getCachedSegment()` calls.
- **Where it appears:** Cache panel table column "Cache hit" with color-coded Yes/No.

### Per-Segment Render Time

- **What it measures:** The time spent rendering an individual Fusion cache segment.
- **How it is collected:** The `RuntimeTracingAspect` starts a `RenderTimer` when a Fusion object enters the runtime content cache and stops it when it exits. The `RenderTimer` records wall-clock time.
- **Where it appears:** Cache panel table column "Render time" (in ms).

### Per-Segment SQL Query Count

- **What it measures:** The number of SQL queries executed while rendering a specific Fusion cache segment.
- **How it is collected:** The `RenderTimer` captures the SQL query count delta (queries executed between `start()` and `stop()` calls).
- **Where it appears:** Cache panel table column "SQL queries".

### Fusion Path

- **What it measures:** The Fusion object path of each cache segment (e.g., `root<Neos.Fusion:Component>`).
- **How it is collected:** The `ContentCacheSegmentAspect` injects the fusion path into the debug metadata for each segment.
- **Where it appears:** Cache panel table column "Fusion path", with toggle-able prototype visibility.

### Cache Entry Identifier

- **What it measures:** The resolved cache entry identifier including its input values (context, format, fusion path, etc.) and the final hashed identifier.
- **How it is collected:** The `ContentCacheSegmentAspect` intercepts `ContentCache::renderContentCacheEntryIdentifier()` to capture the resolved identifier values and the final hash.
- **Where it appears:** Cache panel detail view when expanding an entry.

### Cache Tags

- **What it measures:** The tags associated with a cache entry (used for cache invalidation).
- **How it is collected:** Injected by the `ContentCacheSegmentAspect` into the cache segment metadata.
- **Where it appears:** Cache panel detail view when expanding an entry.

### Cache Lifetime

- **What it measures:** The configured lifetime of a cache entry (in seconds, or `null` for default).
- **How it is collected:** Injected by the `ContentCacheSegmentAspect` into the cache segment metadata.
- **Where it appears:** Cache panel detail view when expanding an entry.

### Cache Creation Timestamp

- **What it measures:** The timestamp when a cache entry was created.
- **How it is collected:** Injected by the `ContentCacheSegmentAspect` into the cache segment metadata.
- **Where it appears:** Cache panel detail view when expanding an entry.

---

## Inspection Overlay

### Segment Type Color Coding

- **What it measures:** Visual representation of each cache segment's mode in the DOM.
- **How it is collected:** The `ContentCacheSegmentAspect` injects per-segment metadata. The frontend parses these and uses `IntersectionObserver` to detect visible segments.
- **Where it appears:** Overlay boxes on cached DOM elements with colored borders:
  - Green border = `cached`
  - Yellow border = `dynamic`
  - Red border = `uncached`

### Segment Detail View

- **What it measures:** Complete metadata for a single cache segment.
- **How it is collected:** All properties from the `ContentCacheSegmentAspect` metadata injection.
- **Where it appears:** Clicking the magnifying glass on any inspection overlay opens a detail overlay showing mode, fusion path, render metrics, entry identifier, tags, lifetime, and more.

---

## Additional Metrics

### Resource Stream Requests

- **What it measures:** Every time a persistent resource's file stream is accessed during rendering.
- **How it is collected:** A before-advice on `ResourceManager::getStreamByResource()` records the resource's SHA1 hash, filename, and collection name.
- **Where it appears:** Additional Metrics panel > Resource Stream Requests section.
- **Use case:** Identifies which persistent resources are loaded during rendering, helping detect slow resource loading or unnecessary file I/O.

### Generated Thumbnails

- **What it measures:** Thumbnails that were generated (not reused from cache) during the request.
- **How it is collected:** An after-returning-advice on `ThumbnailService::getThumbnail()` detects when a new `Thumbnail` object is created (as opposed to returning the original asset). Records the asset's SHA1 hash and usage count. Also adds a message to the `MessagesCollector`.
- **Where it appears:** Additional Metrics panel > Generated Thumbnails section, and as a custom message in the Messages section.
- **Use case:** Identifies expensive thumbnail generation during rendering that could be pre-generated or cached.

### Cache Access Statistics

- **What it measures:** Low-level Flow cache backend operations (get/set) for every cache in the application.
- **How it is collected:** In **Development context only**, the `CacheFactory` is replaced with a custom factory (`Flowpack\Neos\Debug\Cache\CacheFactory`). This factory dynamically creates proxy backend classes that wrap `get()` and `set()` calls, forwarding them to `CacheAccessCollector::trackGet()` and `trackSet()`.
- **Where it appears:** Additional Metrics panel > Cache Access section.
- **Metrics per cache:**
  - **Hits** — successful cache reads
  - **Misses** — cache reads that returned no result
  - **Sets** — cache write operations
- **Use case:** Identifies which caches are being used most heavily and which have low hit rates, helping optimize cache configuration.
- **Note:** Only available in Development context. The proxy class is created via `eval()`.

### Content Context Metrics

- **What it measures:** Information about Neos content repository contexts including workspace, dimensions, and first-level node cache statistics.
- **How it is collected:** The `ContentContextMetricsCollector` (Neos 8 variant) iterates over all context instances from the `ContextFactory` and captures:
  - Workspace name
  - Dimension values
  - Visibility flags (`invisibleContentShown`, `removedContentShown`, `inaccessibleContentShown`)
  - First-level node cache statistics:
    - Nodes by path (count)
    - Nodes by identifier (count)
    - Child nodes by path and node type filter (count)
- **Where it appears:** Additional Metrics panel > Content Context Metrics section.
- **Use case:** Understanding which workspaces are active and how the node cache is populated. Helps debug unexpected content visibility or cache behavior.
- **Note:** Currently implemented for Neos 8 only. The Neos 9 variant returns an empty array.

### Search Queries

- **What it measures:** Elasticsearch/ContentRepository search method calls including class name, method name, and execution time.
- **How it is collected:** The `SearchQueryAspect` hooks into all methods of `Neos\ContentRepository\Search\Search\QueryBuilderInterface` (`execute`, `count`, `query`, `exactMatch`, `fulltext`, `sortDesc`, `sortAsc`, `limit`, `from`, `nodeType`, `aggregation`).
- **Where it appears:** Additional Metrics panel > Search Queries section.
- **Color coding:**
  - Green: execution time < 50 ms
  - Yellow: execution time 50–200 ms
  - Red: execution time > 200 ms
- **Use case:** Identifies slow or frequent search queries that may benefit from caching or optimization.
- **Configuration:** Can be disabled via `searchQueryTracking.enabled: false`.

### Debug-Marked Prototypes

**Note:** This feature needs to be enabled in your settings as it currently has a measurable performance impact:

```yaml
Flowpack:
  Neos:
    Debug:
      debugMetaAttribute:
        enabled: true
```

- **What it measures:** Render time and call count of Fusion prototypes marked with the `@debug` meta-attribute.
- **How it is collected:** The `DebugAttributeAspect` hooks into `RuntimeContentCache::enter()` and `RuntimeContentCache::leave()`, which bracket every Fusion path evaluation. On `enter()` it resolves the path's runtime configuration and, if the attribute is set, records a start timestamp together with the label and the fusion object type. On `leave()` it computes the elapsed wall-clock time and stores it in the `DebugAttributeCollector`.
- **Where it appears:** Additional Metrics panel > Debug-marked prototypes section.
- **What you see:** One row per label (or fusion path, if no string label is set) with columns for Fusion Object, Count, Total, Avg, Min, and Max render time. Times are color-coded (green ≤ 50 ms, yellow 50–200 ms, red > 200 ms). Prototypes sharing the same label are aggregated into one row.
- **Use case:** Measure the rendering performance of specific prototypes — including cache lookups, cache misses, and nested renderings — without instrumenting your code. Just add `@debug = 'My Label'` to a prototype:

  ```fusion
  prototype(Vendor.Site:Box.RelatedContent) < prototype(Neos.Fusion:Component) {
      @debug = 'Related Content'
  }
  ```
- **Note:** The timing covers the whole path evaluation between `enter()` and `leave()`, so it works for cached and uncached evaluations alike. But, as the methods are called for every Fusion path, there is a performance impact which is why the feature is disabled by default.

### Custom Messages

- **What it measures:** Timestamped debug messages added programmatically via `Flowpack\Neos\Debug\DataCollector\MessagesCollector::addMessage($message, $title)`.
- **How it is collected:** The `MessagesCollector` is a static collector that accumulates messages from anywhere in the codebase.
- **Where it appears:** Additional Metrics panel > Messages section.
- **Built-in usage:** Thumbnail generation events automatically add a message with the filename and collection name.

---

## Server-Timing HTTP Header

The `Server-Timing` HTTP response header is viewable in your browsers DevTools Network tab.

**Note:** This feature needs to be enabled in your settings:

```yaml
Flowpack:
  Neos:
    Debug:
      serverTimingHeader:
        enabled: true
```

### processRequest

- **What it measures:** Total request processing time from the start of the HTTP pipeline to the point where the header is added.
- **How it is collected:** The `MeasureServerTimingMiddleware` starts a timer at the beginning of the HTTP pipeline. The `AddServerTimingMiddleware` reads it before the response is sent.

### fusionRenderTime

- **What it measures:** Total time spent in Fusion view rendering.
- **How it is collected:** Measured by the around-advice on `FusionView::render()` and registered as a metric in `DebugService`.

### sqlExecutionTime

- **What it measures:** Total SQL query execution time.
- **How it is collected:** Aggregated by the `DebugStack` SQL logger and registered as a metric in `DebugService`.

### contentCacheHit / contentCacheMiss

- **What it measures:** Count of content cache hits and misses respectively.
- **How it is collected:** Counted by the around-advice on `ContentCache::getCachedSegment()` and registered as metrics in `DebugService`.
