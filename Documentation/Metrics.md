# Metrics Reference

This document explains every metric collected and displayed by Flowpack.Neos.Debug, how it is gathered server-side, and where it appears in the debug panel.

## Status Bar Metrics

These metrics are always visible in the status bar at the bottom-right of the page.

### Total Render Time

- **What it measures:** The total time spent rendering the Fusion view.
- **How it is collected:** The `render` method of the `FusionView` is timed via a wrapping aspect.
- **Where it appears:** Status bar (left side, in ms), and as the `processRequest` metric in the Server-Timing header.
- **Use case:** Gives a rough hint whether the page render performance is ok. If the rendering takes multiple seconds or stays the same between reloads, the rendering should be investigated.

### SQL Query Count

- **What it measures:** Total number of SQL queries executed during the request.
- **How it is collected:** The `DebugStack` SQL logger wraps Doctrine's DBAL logging and increments a counter for each query.
- **Where it appears:** Status bar next to the SQL button, and in the SQL panel summary.
- **Use case:** A typical page shouldn't require more than 200-300 queries for uncached requests. If there are more this should be investigated.

### Slow Query Count

- **What it measures:** Number of SQL queries whose execution time exceeded the configured `sql.slowQueryAfter` threshold (default: 10 ms).
- **How it is collected:** The `DebugStack` compares each query's execution time against the threshold and records slow queries separately.
- **Where it appears:** Status bar next to the SQL button (orange when > 0).
- **Use case:** Spot especially slow queries, f.e. triggered by `q(site).find()'` queries in Fusion.

### Cache Hits

- **What it measures:** Number of Fusion content cache segments that returned a cached result.
- **How it is collected:** Via an aspect around the `ContentCache`.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.
- **Use case:** Multiple requests to the same page should result in cache hits only. Too many cache hits could also indicated that you have to many cacheable prototypes which could actually hurt performance due to many requests to the cache backend.

### Cache Misses

- **What it measures:** Number of Fusion content cache segments that did not have a cached result and had to be rendered fresh.
- **How it is collected:** Same as cache hits.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.
- **Use case:** Repeated requests to the same page should result in 0 cache misses. If cache misses persist, this should be investigated.

### Uncached Segments

- **What it measures:** Number of Fusion cache segments configured with `mode = "uncached"` or `"dynamic"` that were evaluated.
- **How it is collected:** Counts all rendered debug segments which are not `"cached"` or `"dynamic"`.
- **Where it appears:** Status bar next to the Cache button, and in the Cache panel summary.
- **Use case:** Uncached segments slow down page rendering, except for `POST` requests, there are few good reasons to keep them.

### Additional Metrics Badge

- **What it measures:** Many other metrics, see [Additional Metrics](#additional-metrics). The total number of custom debug messages (from `MessagesCollector`) is shown in braces.
- **How it is collected:** See [Additional Metrics](#additional-metrics).
- **Where it appears:** Status bar badge on the Additional Metrics button.
- **Use case:** Other metrics which are collected by an extensible collector system.

---

## SQL Panel Metrics

### Total Execution Time

- **What it measures:** Sum of execution times across all SQL queries executed during the request.
- **How it is collected:** Each query's timing is recorded by the `DebugStack` SQL logger and summed after the request.
- **Where it appears:** SQL panel summary line.
- **Use case:** This number should give an indicator of how much time is spent for queries during the rendering. Usually this should be a high percentage of the total rendering time.

### Per-Table Breakdown

- **What it measures:** Query count and total execution time grouped by database table name.
- **How it is collected:** The `DebugStack` parses the `FROM` clause of each SQL query via regex and groups statistics by extracted table name.
- **Where it appears:** SQL panel as expandable table groups, sorted by total execution time (descending).
- **Use case:** Usually the top 5 entries are responsible for the largest amount of time spent on queries. 

### Per-Query Details

- **What it measures:** Individual SQL query strings with their execution time, call count, and per-parameter-set breakdown.
- **How it is collected:** The `DebugStack` stores each query's SQL string, parameters, types, and timing. After the request, queries are grouped by table name and then by SQL string, with execution time sums and count per unique parameter set.
- **Where it appears:** SQL panel as rows within each table group, expandable to show parameter details.
- **Use case:** You can check here whether a few calls took a lot of time or whether there are too many calls compared to the number of rendered nodes or assets. This is a good start for optimization. 

### Slow Query Detection

- **What it measures:** Individual queries or parameter sets whose execution time exceeded the `sql.slowQueryAfter` threshold.
- **How it is collected:** The `DebugStack` compares each query's execution time against the configured threshold. Both the aggregate query and individual parameter sets can be flagged.
- **Where it appears:** SQL panel with a warning icon on affected queries and parameter sets.
- **Use case:** Try to have 0 slow queries, but for initial rendering a few might be possible as acceptable.

### Parameter Analysis

- **What it measures:** For each unique SQL query, how many times each distinct parameter set was used and the combined execution time per set.
- **How it is collected:** Queries are grouped by SQL string, and within each group, parameters are JSON-serialized to identify unique sets.
- **Where it appears:** SQL panel as expandable "Calls by parameters" rows within each query.
- **Use case:** This can help with analyzing where certain queries were called and for reproducing them in a SQL query console.

---

## Cache Panel Metrics

### Cache Entry Mode

- **What it measures:** The cache mode of each Fusion segment (`cached`, `uncached`, or `dynamic`).
- **How it is collected:** This plugin renders HTML comments. These are parsed and contain the data for each (un)cached segment.
- **Where it appears:** Cache panel table with color-coded borders (green = cached, yellow = dynamic, red = uncached).

### Cache Hit Status

- **What it measures:** Whether a cached segment was a cache hit or miss.
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel table column "Cache hit" with color-coded Yes/No.
- **Use case:** Repeated requests should result in 100% hits.

### Per-Segment Render Time

- **What it measures:** The time spent rendering an individual Fusion cache segment.
- **How it is collected:** The `RuntimeTracingAspect` starts a timer when a Fusion object enters the runtime content cache and stops it when it exits.
- **Where it appears:** Cache panel table column "Render time" (in ms).
- **Use case:** Each entry shows the time including all its rendered children. So sorting from the highest to lowest value is recommended but the first entry (usually "root") might not be the one you have to investigate.

### Per-Segment SQL Query Count

- **What it measures:** The number of SQL queries executed while rendering a specific Fusion cache segment.
- **How it is collected:** The `RenderTimer` captures the SQL query count delta (queries executed between `start()` and `stop()` calls).
- **Where it appears:** Cache panel table column "SQL queries".
- **Use case:** Each entry shows the time including all its rendered children. So sorting from the highest to lowest value is recommended but the first entry (usually "root") might not be the one you have to investigate.

### Fusion Path

- **What it measures:** The Fusion object path of each cache segment (e.g., `root<Neos.Fusion:Component>`).
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel table column "Fusion path", with toggle-able prototype visibility.
- **Use case:** This helps you find out which component was rendered and where in the render tree.

### Cache Entry Identifier

- **What it measures:** The resolved cache entry identifier including its input values (context, format, fusion path, etc.) and the final hashed identifier.
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel detail view when expanding an entry.
- **Use case:** This helps to identify which parts the identifier is built from. If you have problems with cached segments from being reused (f.e. between pages), this should give an indicator. 

### Cache Tags

- **What it measures:** The tags associated with a cache entry (used for cache invalidation).
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel detail view when expanding an entry.
- **Use case:** This helps to identify what triggers a cache flush of the given segment. These should be as few as possible and as many as necessary.

### Cache Lifetime

- **What it measures:** The configured lifetime of a cache entry (in seconds, or `null` for default).
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel detail view when expanding an entry.
- **Use case:** This should usually be `null`, which uses the default lifetime. If there is a numeric value, make sure that is not too low.

### Cache Creation Timestamp

- **What it measures:** The timestamp when a cache entry was created.
- **How it is collected:** via the `ContentCacheSegmentAspect`.
- **Where it appears:** Cache panel detail view when expanding an entry.
- **Use case:** This can also help when trying to find out whether multiple pages reuse the same cache entry.

---

## Inspection Overlay

### Segment Type Color Coding

- **What it measures:** Visual representation of each cache segment's mode in the DOM.
- **How it is collected:** via the `ContentCacheSegmentAspect`.
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
- **How it is collected:** A before-advice on the `ResourceManager` records the resource's SHA1 hash, filename, and collection name.
- **Where it appears:** Additional Metrics panel > Resource Stream Requests section.
- **Use case:** Identifies which persistent resources are loaded during rendering, helping detect slow resource loading or unnecessary file I/O.

### Generated Thumbnails

- **What it measures:** Thumbnails that were generated (not reused from cache) during the request.
- **How it is collected:** An after-returning-advice on the `ThumbnailService` detects when a new `Thumbnail` object is created (as opposed to returning the original asset). Records the asset's SHA1 hash and usage count.
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
- **How it is collected (Neos 8):** The `NodeAccessCollectorNeos8` iterates over all context instances from the `ContextFactory` and captures:
  - Workspace name
  - Dimension values
  - Visibility flags (`invisibleContentShown`, `removedContentShown`, `inaccessibleContentShown`)
  - First-level node cache statistics:
    - Nodes by path (count)
    - Nodes by identifier (count)
    - Child nodes by path and node type filter (count)
- **How it is collected (Neos 9):** The `NodeAccessCollectorNeos9` iterates over all context instances from the `ContextFactory` and captures:
  - Workspace name
  - Dimension values
  - Subtree tags (`disabled`, `removed`)
  - First-level node cache statistics:
    - Nodes by path (count)
    - Nodes by identifier (count)
    - Child nodes by identifier (count)
- **Where it appears:** Additional Metrics panel > Content Context Metrics section.
- **Use case:** Understanding which workspaces are active and how the node cache is populated. Helps debug unexpected content visibility or cache behavior.

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
