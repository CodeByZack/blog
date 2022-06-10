import DevbookSplit, {
    SplitDirection as DevbookSplitDirection,
    GutterTheme as DevbookGutterTheme,
  } from "@devbookhq/splitter";
  import { FunctionComponent, useState, useCallback } from "react";
  
  interface SplitterProps {
    direction?: keyof typeof DevbookSplitDirection;
    minWidths?: number[];
    minHeights?: number[];
    initialSizes?: number[];
    gutterTheme?: keyof typeof DevbookGutterTheme;
    gutterClassName?: string;
    draggerClassName?: string;
    onResizeStarted?: (pairIdx: number) => void;
    onResizeFinished?: (pairIdx: number, newSizes: number[]) => void;
    classes?: string[];
  }
  
  export const SplitDirection = DevbookSplitDirection;
  export const GutterTheme = DevbookGutterTheme;
  
  export const Splitter: FunctionComponent<SplitterProps> = ({
    direction = "Horizontal",
    gutterTheme = "dark",
    children,
    initialSizes,
    ...props
  }) => {
    // Capture the splitter sizes and store them in a state to avoid https://github.com/DevbookHQ/splitter/issues/11
    const [persistentSizes, setPersistentSizes] = useState<number[] | undefined>(
      initialSizes
    );
  
    const handleResizeFinished = useCallback((_, newSizes) => {
      setPersistentSizes(newSizes);
    }, []);
  
    return (
      <DevbookSplit
        direction={DevbookSplitDirection[direction]}
        gutterTheme={DevbookGutterTheme[gutterTheme]}
        onResizeFinished={handleResizeFinished}
        initialSizes={persistentSizes}
        {...props}
      >
        {children}
      </DevbookSplit>
    );
  };