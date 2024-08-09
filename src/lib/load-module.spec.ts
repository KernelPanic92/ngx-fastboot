import { loadModule } from './load-module';
import { LazyModule } from './types';

describe('loadModule', () => {
  it('should load a module that directly returns a value', async () => {
    const module: LazyModule<string> = async () => 'testValue';
    
    const result = await loadModule(module);
    
    expect(result).toBe('testValue');
  });

  it('should load a module that returns an object with a default export', async () => {
    const module: LazyModule<string> = async () => ({ default: 'testDefaultValue' });
    
    const result = await loadModule(module);
    
    expect(result).toBe('testDefaultValue');
  });

  it('should handle a module that returns an object without a default export', async () => {
    const module: LazyModule<{ value: string }> = async () => ({ value: 'testValue' });
    
    const result = await loadModule(module);
    
    expect(result).toEqual({ value: 'testValue' });
  });

  it('should handle a module that throws an error', async () => {
    const module: LazyModule<string> = async () => {
      throw new Error('Test error');
    };

    await expect(loadModule(module)).rejects.toThrow('Test error');
  });
});
