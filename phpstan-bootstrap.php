<?php

declare(strict_types=1);

/**
 * Bootstrap file that locates the Composer autoloader regardless of where
 * the package is installed (monorepo DistributionPackages/, Neos Packages/Plugins/, etc.).
 */
$possiblePaths = [
    __DIR__ . '/../../Packages/Libraries/autoload.php',
    __DIR__ . '/../../Libraries/autoload.php',
    __DIR__ . '/../../../Packages/Libraries/autoload.php',
];

foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        require $path;
        return;
    }
}

throw new \RuntimeException(sprintf(
    'Could not locate autoload.php. Tried: %s',
    implode(', ', $possiblePaths)
));
