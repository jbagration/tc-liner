export const formatNameForURL = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/!/g, '');
  };
  