function saveState(name: string, value: any) {
  if (typeof window !== 'undefined') {
    if (name === 'userAnswersData' && JSON.parse(localStorage.getItem(name))) {
      const obj = { ...JSON.parse(localStorage.getItem(name)), ...value };
      localStorage.setItem(name, JSON.stringify(obj));
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
  }
}

function loadState(name: string) {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(name);
    return savedState ? JSON.parse(savedState) : null;
  }
}

export { loadState, saveState };
