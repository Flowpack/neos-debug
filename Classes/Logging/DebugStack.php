<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Logging;

/**
 * This file is part of the Flowpack.Neos.Debug package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Doctrine\DBAL\Logging\SQLLogger;
use Neos\Flow\Annotations as Flow;

class DebugStack implements SQLLogger
{
    public array $queries = [];

    public array $tables = [];

    public int $queryCount = 0;

    public float $executionTime = 0.0;

    protected float $startTime = 0;

    public array $slowQueries = [];

    #[Flow\InjectConfiguration("sql.slowQueryAfter")]
    protected float $slowQueryAfter;

    public function startQuery($sql, ?array $params = null, ?array $types = null): void
    {
        $tableName = $this->parseTableName($sql);
        $this->queries[++$this->queryCount] = [
            'sql' => $sql,
            'table' => $tableName,
            'params' => $params,
            'types' => $types,
            'executionMS' => 0
        ];
        $this->startTime = microtime(true);
    }

    public function stopQuery(): void
    {
        $executionTime = (microtime(true) - $this->startTime) * 1000;
        $this->queries[$this->queryCount]['executionMS'] = $executionTime;
        $this->executionTime += $executionTime;

        if ($executionTime > $this->slowQueryAfter) {
            $this->slowQueries[] = $this->queries[$this->queryCount];
        }

        $table = $this->queries[$this->queryCount]['table'];
        if (!array_key_exists($table, $this->tables)) {
            $this->tables[$table] = [
                'queryCount' => 1,
                'executionTime' => $executionTime,
            ];
        } else {
            $this->tables[$table]['queryCount']++;
            $this->tables[$table]['executionTime'] += $executionTime;
        }
    }

    protected function parseTableName(string $sql): string
    {
        $sql = strtolower($sql);
        $start = strpos($sql, 'from ') + 5;
        $end = strpos($sql, ' ', $start);
        return substr($sql, $start, $end - $start);
    }
}
