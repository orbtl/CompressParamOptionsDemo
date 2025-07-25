import { useMemo, useCallback, useEffect } from 'react';
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
  compressedString: string;
}

export const useUrlSelectedOptions = (
  optionMap: OptionMap,
  paramName: string = 'filters'
): UseUrlSelectedOptionsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const compressedParam = searchParams.get(paramName) || '';

  // Decompress the URL parameter to get selected options
  const selectedOptions = useMemo(() => {
    if (!compressedParam) return new Set<string>();

    try {
      return decompressOptions(optionMap, compressedParam);
    } catch {
      // If decompression fails, return empty set
      return new Set<string>();
    }
  }, [optionMap, compressedParam]);

  const handleOptionChange = useCallback((option: string, checked: boolean) => {
    const newSelected = new Set(selectedOptions);
    if (checked) {
      newSelected.add(option);
    } else {
      newSelected.delete(option);
    }

    // Update URL parameters
    setSearchParams((prevParams) => {
      if (newSelected.size === 0) {
        // Remove the parameter if no options are selected
        prevParams.delete(paramName);
      } else {
        // Compress the new selection and update the URL
        try {
          const compressed = compressOptions(optionMap, newSelected);
          prevParams.set(paramName, compressed);
        } catch {
          // If compression fails, remove the parameter
          prevParams.delete(paramName);
        }
      }
      return prevParams;
    }, { replace: true });
  }, [selectedOptions, setSearchParams, paramName, optionMap]);

  // Clean up invalid URL parameters on mount
  useEffect(() => {
    if (compressedParam && selectedOptions.size === 0) {
      console.log('cleaning');
      // If we have a compressed param but no valid selected options, clean it up
      setSearchParams((prevParams) => {
        prevParams.delete(paramName);
        return prevParams;
      }, { replace: true });
    }
  }, [compressedParam, selectedOptions.size, setSearchParams, paramName]);

  return {
    selectedOptions,
    handleOptionChange,
    compressedString: compressedParam || ''
  };
};