type UndoAction = {
  doWithData: () => void;
  undoWithData: () => void;
};

export function createUndoStack() {
  const past: UndoAction[] = [];
  const future: UndoAction[] = [];
  return {
    push(
      doFn: (...args: any[]) => void,
      undoFn: (...args: any[]) => void,
      ...withArgumentsToClone: any[]
    ) {
      const clonedArgs = structuredClone(withArgumentsToClone);
      const action = {
        doWithData() {
          doFn(...clonedArgs);
        },
        undoWithData() {
          undoFn(...clonedArgs);
        },
      };
      action.doWithData();

      // Adding a new action wipes the redoable steps
      past.push(action);

      future.length = 0;
    },

    undo() {
      const action = past.pop();
      if (action) {
        action.undoWithData();
        future.unshift(action);
      }
    },

    redo() {
      const action = future.shift();
      if (action) {
        action.doWithData();
        past.push(action);
      }
    },

    get undoAvailable() {
      return past.length > 0;
    },

    get redoAvailable() {
      return future.length > 0;
    },

    clear() {
      past.length = 0;
      future.length = 0;
      return true;
    },
  };
}
