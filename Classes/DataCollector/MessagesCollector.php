<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\Domain\Model\Dto\Message;
use Neos\Flow\Annotations as Flow;

/**
 * A collector for custom debug data that can be accessed statically
 */
#[Flow\Scope("singleton")]
class MessagesCollector extends AbstractDataCollector
{

    /**
     * @var Message[]
     */
    protected static array $messages = [];

    /**
     * @return Message[]
     */
    public function collect(): array
    {
        return self::$messages;
    }

    public function getName(): string
    {
        return 'messages';
    }

    public static function addMessage(string $message, ?string $title = null): void
    {
        self::$messages[] = new Message($message, $title);
    }
}
