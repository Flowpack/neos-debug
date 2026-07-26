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
    /**
     * @var array<int, array{sql: string, table: string, params: array<string, mixed>|null, types: array<string, string>|null, executionMS: float}>
     */
    public array $queries = [];

    /**
     * @var array<string, array{queryCount: int, executionTime: float}>
     */
    public array $tables = [];

    public int $queryCount = 0;

    public float $executionTime = 0.0;

    protected float $startTime = 0;

    /**
     * @var array<int, array{sql: string, table: string, params: array<string, mixed>|null, types: array<string, string>|null, executionMS: float}>
     */
    public array $slowQueries = [];

    #[Flow\InjectConfiguration('sql.slowQueryAfter')]
    protected float $slowQueryAfter;

    /**
     * @param SQLLogger|null $originalLogger The original SQL logger to delegate to
     */
    public function __construct(protected ?SQLLogger $originalLogger = null)
    {
    }

    /**
     * @param string $sql
     * @param array<string, mixed>|null $params
     * @param array<string, string>|null $types
     */
    public function startQuery($sql, ?array $params = null, ?array $types = null): void
    {
        $tableName = $this->parseTableName($sql);
        $this->queries[++$this->queryCount] = [
            'sql' => $sql,
            'table' => $tableName,
            'params' => $params,
            'types' => $types,
            'executionMS' => 0.0,
        ];
        $this->startTime = microtime(true);
        $this->originalLogger?->startQuery($sql, $params, $types);
    }

    public function stopQuery(): void
    {
        $executionTime = (microtime(true) - $this->startTime) * 1000;
        $query = $this->queries[$this->queryCount];
        $this->queries[$this->queryCount] = [
            'sql' => $query['sql'],
            'table' => $query['table'],
            'params' => $query['params'],
            'types' => $query['types'],
            'executionMS' => $executionTime,
        ];
        $this->executionTime += $executionTime;

        $queryData = $this->queries[$this->queryCount];
        if ($executionTime > $this->slowQueryAfter) {
            $this->slowQueries[] = $queryData;
        }

        $table = $queryData['table'];
        if (!array_key_exists($table, $this->tables)) {
            $this->tables[$table] = [
                'queryCount' => 1,
                'executionTime' => $executionTime,
            ];
        } else {
            $this->tables[$table]['queryCount']++;
            $this->tables[$table]['executionTime'] += $executionTime;
        }
        $this->originalLogger?->stopQuery();
    }

    protected function parseTableName(string $sql): string
    {
        $sql = strtolower($sql);
        if (preg_match('/from\s+([`"\[]?[\w.]+[`"\]]?)/', $sql, $matches)) {
            return trim($matches[1], '`"[]');
        }
        return '';
    }
}
