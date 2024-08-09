import { resolveProviders } from './resolve-providers';
import { AngularProvider, FastProvider } from './types';


describe('resolveProviders', () => {
  it('should resolve multiple providers correctly', async () => {
    const providers: Array<FastProvider> = [
      { provide: 'test1', useValue: 'value1' },
      { provide: 'test2', useValue: 'value2' },
    ];
  
    const expected: Array<FastProvider> = [
      { provide: 'test1', useValue: 'value1' },
      { provide: 'test2', useValue: 'value2' },
    ];

    const actual = await resolveProviders(providers);

    expect(actual).toEqual(expected);
  });

  it('should flatten the resolved providers array', async () => {
    const providers: Array<FastProvider> = [
      { provide: 'test1', useValue: 'value1' },
      async () => [
        { provide: 'test2', useValue: 'value2' },
        { provide: 'test3', useValue: 'value3' },
      ]
    ];
  
    const expected: Array<FastProvider> = [
      { provide: 'test1', useValue: 'value1' },
      { provide: 'test2', useValue: 'value2' },
      { provide: 'test3', useValue: 'value3' },
    ];

    const actual = await resolveProviders(providers);

    expect(actual).toEqual(expected);
  });

  it('should handle an empty providers array', async () => {
    const actual = await resolveProviders([]);

    expect(actual).toEqual([]);
  });

  it('should handle a provider that throws an error', async () => {
    const provider1: FastProvider = { provide: 'test1', useValue: 'value1' };
    const provider2: FastProvider = async () => {
      throw new Error('Test error');
    };

    await expect(resolveProviders([provider1, provider2])).rejects.toThrow('Test error');
  });
});
