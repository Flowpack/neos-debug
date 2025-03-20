# Flowpack.Neos.Debug

⚠️ This plugin rewrite is currently work-in-progress. Only use if you know what you are doing.

This plugin is a small helper package to add a debug panel to your [Neos CMS](https://www.neoss.io) website. 
At this point in time you're able to debug your content cache configuration as well as sql queries.
Additionally, the Server-Timing http header can be enabled that will add request timings to responses. 
Those then can be viewed in the browser network tab.

_Note: This is still a very early rough version. Contributions are welcome in any Error. Nevertheless, it's already adding value to your debug experience_

This plugin is based on the [t3n/neos-debug](https://github.com/t3n/neos-debug) package.

## Screenshots

![Neos CMS Demo Site with enabled debug console](Documentation/debug-bar.jpg 'Neos CMS Demo Site with enabled debug console')
![Server-Timing header in the browser network tab](Documentation/server-timing.jpg 'Viewing the timings in the browser network tab')

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
__enable_neos_debug__()
```

_Disclaimer: Once the debug mode is enabled you might expose sensitive data. Make sure to **not** use this in production. At least be warned_

In a previous version of this package your current user needed a specific role as well. We dropped this requirement for now as you could not use this package if you don't have a frontend login on your site. Once the package is active it will render some metadata in your html output.

To get the debugger running you now need to include some javascript and css to acutally render the debug console. This package ships two fusion prototypes to include all resources. If your Document extends `Neos.Neos:Page` you don't need to include anything. We already added the resources to `Neos.Neos:Page` prototype.

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

## Usage

To enable the cache visualization open your browsers developer console and execute
`__enable_neos_debug__()`. This will bring up the debug console at the bottom of your screen.

### 🔦 Inspect

Once you enable the inspect mode a visualization will pop up and add overlays on your cached parts. Cached parts are marked green, uncached red and dynamic caches are marked yellow. If you hover the loupe you will also see some meta data regarding the cache.

### ⚡️ Cache

This module will add a new modal including some statistics regarding cache hits and misses as well as a table of all rendered cache entries.

### 🗄 SQL

In addition to the content cache we're also exposing some debug SQL informations and statistics. It will also detect slow queries. You can configure from when a query should be marked as slow:

```yaml
Flowpack:
  Neos:
    Debug:
      sql:
        # Set when a query should be considered as slow query. In ms
        slowQueryAfter: 10
```

Note: this plugin adds its own SQL logger via an aspect during runtime. If you have a custom logger enabled, 
it will be wrapped and its functionality should remain. If you experience any issues, disable this
plugin and check if the problem persists.

### 🚫 Close

To shutdown the debug console simply close it. If you'd like to persist the active debug state you can add a `true` to the method

```
__enable_neos_debug__(true)
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

With this modification, you can use the `__enable_neos_debug__()` function in your browser console to enable the debug widget.

⚠️Make sure to remove this script in production environments or when in a shared plugin 
as the prototype might not be available in every environment.

### License

Licensed under MIT, see [LICENSE](LICENSE)
