<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\Domain\Model\Dto\Message;
use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class MessagesCollector extends AbstractDataCollector
{

    /**
     * @var Message[] $messages
     */
    private array $messages = [];

    public function collect(): array
    {
        return $this->messages;
    }

    public function getName(): string
    {
        return 'messages';
    }

    public function addMessage(string $message, string $title = null): void
    {
        $this->messages[] = new Message($message, $title);
    }
}
