// create mock messages for testing
export const mockMessages = [
  {
    id: 1,
    userMessage: {
      id: 1,
      content: 'What is thread in Java?',
      sender: 'user',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
    aiMessage: {
      id: 2,
      content:
        'In Java, a thread is a separate unit of execution within a process. Threads allow for concurrent execution of tasks, improving efficiency.',
      sender: 'ai',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
  },
  {
    id: 2,
    userMessage: {
      id: 3,
      content: 'How to create threads?',
      sender: 'user',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
    aiMessage: {
      id: 4,
      content: '1. Extend Thread Class. 2. Implement Runnable.',
      sender: 'ai',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
  },
  {
    id: 3,
    userMessage: {
      id: 5,
      content: 'What is multitasking in Java thread?',
      sender: 'user',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
    aiMessage: {
      id: 6,
      content:
        'Multitasking in Java threads refers to the ability of the Java runtime to manage and execute multiple threads concurrently. ',
      sender: 'ai',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
  },
  {
    id: 4,
    userMessage: {
      id: 7,
      content: 'What is synchronization in Java thread?',
      sender: 'user',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
    aiMessage: {
      id: 8,
      content:
        'Synchronization in Java threads refers to the mechanism used to control access to shared resources among multiple threads to prevent data inconsistency and conflicts. ',
      sender: 'ai',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
  },
  {
    id: 5,
    userMessage: {
      id: 9,
      content: 'What is thread transition?',
      sender: 'user',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
    aiMessage: {
      id: 10,
      content:
        'Thread transition, in the context of Java threads, refers to the various states that a thread can go through during its lifecycle. Threads can transition between different states as they are created, run, and complete their tasks. ',
      sender: 'ai',
      timestamp: '2020-04-01T12:00:00.000Z',
    },
  },
];
