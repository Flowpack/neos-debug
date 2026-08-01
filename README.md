# Flowpack.Neos.Debug

This plugin is a small helper package to add a debug panel to your [Neos CMS](https://www.neos.io) website.
It provides comprehensive debugging capabilities including content cache visualization, SQL query analysis, search query tracking, resource loading insights, and Server-Timing HTTP headers.

_For a detailed explanation of every metric and what it measures, see [Documentation/Metrics.md](Documentation/Metrics.md)._

This plugin is based on the now unmaintained [t3n/neos-debug](https://github.com/t3n/neos-debug) package and replaces it fully.

## Features

- **Content Cache Inspection** — Visual overlay on cached, uncached, and dynamic Fusion cache segments directly in the browser, with per-segment render time and SQL query count
- **Cache Hit/Miss Analysis** — Overview of all rendered cache entries with hit/miss status, sortable by fusion path, render time, or SQL count
- **SQL Query Monitoring** — All database queries grouped by table with execution times, parameter analysis, and slow query detection
- **Search Query Tracking** — Elasticsearch/ContentRepository search method calls with execution times
- **Resource Stream Tracking** — All persistent resource files loaded during rendering
- **Thumbnail Generation Tracking** — Detects newly generated thumbnails during rendering
- **Cache Backend Access Statistics** — Low-level Flow cache get/set/miss counts per cache (Development context only)
- **Content Context Metrics** — Workspace, dimensions, visibility flags, and first-level node cache statistics
- **Custom Debug Messages** — API for adding timestamped messages to the debug output
- **Debug Marked Prototypes** — Track render time and call count of any Fusion prototype marked with a `@debug` meta-attribute
- **Server-Timing HTTP Header** — Emits request timings as HTTP headers viewable in browser DevTools

## Screenshots

![Neos CMS Demo Site with debug console showing cache visualization](Documentation/NeosDebugFusionCache.jpg 'Neos CMS Demo Site with debug console showing cache visualization')
![Neos CMS Demo Site with debug console showing database queries](Documentation/NeosDebugDatabaseQueries.jpg 'Neos CMS Demo Site with debug console showing database queries')
![Neos CMS Demo Site with debug console showing other metrics](Documentation/NeosDebugOtherMetrics.jpg 'Neos CMS Demo Site with debug console showing other metrics')
![Server-Timing header in the browser network tab](Documentation/NeosDebugServerTiming.jpg 'Viewing the timings in the browser network tab')

## Installation & configuration

Install the package via composer

```
composer require flowpack/neos-debug --dev
```

The debug mode is disabled by default. To enable it add this to your Settings.yaml

```yaml
Flowpack:
  Neos:
    Debug:
      enabled: true
```

To bring up the debug panel run this command in your js console:
```js
__enable_neos_debug()
```

_Disclaimer: Once the debug mode is enabled you might expose sensitive data. Make sure to **not** use this in production. At least be warned_

In a previous version of this package your current user needed a specific role as well. We dropped this requirement for now as you could not use this package if you don't have a frontend login on your site. Once the package is active it will render some metadata in your html output.

To get the debugger running you now need to include some javascript and css to actually render the debug console. This package ships two fusion prototypes to include all resources. If your Document extends `Neos.Neos:Page` you don't need to include anything. We already added the resources to `Neos.Neos:Page` prototype.

### HTTP Server-Timing header

The header is disabled by default. To enable it add this to your Settings.yaml

```yaml
Flowpack:
  Neos:
    Debug:
      serverTimingHeader:
        enabled: true
```

If you only want the header with all timings but not the debug mode, do this:

```yaml
Flowpack:
  Neos:
    Debug:
      enabled: true
      htmlOutput:
        enabled: false
      serverTimingHeader:
        enabled: true
```

### Additional configuration options

```yaml
Flowpack:
  Neos:
    Debug:
      # Master switch — disables all data collection when false
      enabled: true
      htmlOutput:
        # Controls whether debug data is injected into HTML and the JS panel loads
        enabled: true
      serverTimingHeader:
        # Controls whether the Server-Timing HTTP header is emitted
        enabled: false
      searchQueryTracking:
        # Tracks Elasticsearch/ContentRepository search method calls
        enabled: true
      sql:
        # Queries taking longer than this (in ms) are flagged as slow
        slowQueryAfter: 10
```

## Usage

To enable the cache visualization open your browsers developer console and execute
`__enable_neos_debug()`. This will bring up the debug console at the bottom of your screen.

### Status Bar

The status bar appears at the bottom-right of the page and displays:
- Total Fusion render time in ms
- Inspect button — toggles visual cache overlay mode
- SQL button — shows query count and slow query count
- Cache button — shows hits, misses, and uncached segment counts
- Additional metrics button — shows message count badge
- Close button — shuts down the debug console

### 🔦 Inspect

Once you enable the inspect mode a visualization will pop up and add overlays on your cached parts. Cached parts are marked green, uncached red and dynamic caches are marked yellow. If you hover the loupe you will also see some meta data regarding the cache. Clicking the magnifying glass on any overlay opens a detail view with all cache entry properties (fusion path, tags, lifetime, entry identifier, etc.).

### ⚡️ Cache

This module will add a new modal including some statistics regarding cache hits and misses as well as a table of all rendered cache entries. The table is sortable by mode, cache hit, render time, SQL queries, and fusion path. Each entry can be expanded to show full cache metadata.

### 🗄 SQL

In addition to the content cache we're also exposing some debug SQL information and statistics. It will also detect slow queries. You can configure from when a query should be marked as slow:

```yaml
Flowpack:
  Neos:
    Debug:
      sql:
        # Set when a query should be considered as slow query. In ms
        slowQueryAfter: 10
```

The SQL panel shows:
- Total query count and execution time
- Queries grouped by table name with per-table execution time
- Per-query parameter analysis showing how many times each unique parameter set was used
- Slow query warnings for queries exceeding the configured threshold

Note: this plugin adds its own SQL logger via an aspect during runtime. If you have a custom logger enabled,
it will be wrapped and its functionality should remain. If you experience any issues, disable this
plugin and check if the problem persists.

### 📊 Additional Metrics

The additional metrics panel contains several subsections:

- **Resource Stream Requests** — Lists all persistent resource files loaded during rendering, with filename, SHA1 hash, and collection name
- **Generated Thumbnails** — Thumbnails that were generated (not reused from cache) during rendering
- **Cache Access** — Low-level Flow cache backend hit/miss/set statistics per cache identifier (Development context only)
- **Messages** — Custom debug messages with timestamp, title, and body
- **Content Context Metrics** — Neos workspace information including dimensions, visibility flags, and first-level node cache statistics
- **Search Queries** — Elasticsearch/ContentRepository search method invocations with execution times, color-coded by duration
- **Debug-Marked Prototypes** — Render performance of Fusion prototypes marked with the `@debug` meta-attribute (disabled by default)

Learn more about the metrics in the [documentation](Documentation/Metrics.md).

### 🚫 Close

To shutdown the debug console simply close it. If you'd like to persist the active debug state you can add a `true` to the method

```
__enable_neos_debug(true)
```

This will set a cookie and the debug mode will still be active after a page refresh.

### Using it in custom Fusion views (e.g. Neos backend modules)

To use the debug widget in custom Fusion views, you can include the necessary resources like this:

```fusion
    include: resource://Flowpack.Neos.Debug/Private/Fusion/Fragments/Scripts.fusion

    My.Package.MyController.index {
        @process.addLoadDebugScript = afx`
            {value}
            <Flowpack.Neos.Debug:Fragment.Scripts/>
        `
    }
```

With this modification, you can use the `__enable_neos_debug()` function in your browser console to enable the debug widget.

⚠️Make sure to remove this script in production environments or when in a shared plugin
as the prototype might not be available in every environment.

### License

Licensed under MIT, see [LICENSE](LICENSE)
