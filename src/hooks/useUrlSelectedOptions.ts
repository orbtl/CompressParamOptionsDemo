import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  compressOptions,
  decompressOptions,
  type OptionMap,
  type SelectedOptions,
} from 'compress-param-options';

interface UseUrlSelectedOptionsResult {
  selectedOptions: SelectedOptions;
  handleOptionChange: (option: string, checked: boolean) => void;
  handleClear: () => void;
  compressedString: string;
}

export const useUrlSelectedOptions = (
  optionMap: OptionMap,
  paramName: string = 'filters'
): UseUrlSelectedOptionsResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const compressedParam = searchParams.get(paramName) || '';

  // Decompress the URL parameter to get initial selected options
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!compressedParam) return new Set<string>();

    try {
      return decompressOptions(optionMap, compressedParam);
    } catch {
      // If decompression fails, return empty set
      return new Set<string>();
    }
  });

  const handleOptionChange = useCallback((option: string, checked: boolean) => {
    // Update local state first for responsive feedback
    let newOptions: Set<string>;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        prevSelectedOptions.add(option);
      } else {
        prevSelectedOptions.delete(option);
      }
      newOptions = new Set(prevSelectedOptions);

      // debounce handling the url update possibly if perf concerns?
      return newOptions;
    });

    // Update URL parameters
    setSearchParams((prevParams) => {
      try {

        if (newOptions.size === 0) {
          prevParams.delete(paramName);
        } else {
          const compressed = compressOptions(optionMap, newOptions);
          prevParams.set(paramName, compressed);
        }
      } catch {
        // If compression fails, remove the parameter
        prevParams.delete(paramName);
      }
      return prevParams;
    }, { replace: true });
  }, [setSearchParams, paramName, optionMap]);

  const handleClear = useCallback(() => {
    setSelectedOptions(new Set<string>());
    setSearchParams((prevParams) => {
      prevParams.delete(paramName);
      return prevParams;
    });
  }, [setSearchParams]);

  return {
    selectedOptions,
    handleOptionChange,
    handleClear,
    compressedString: compressedParam
  };
};