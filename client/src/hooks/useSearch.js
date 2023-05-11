const useSearch = () => {
  const search = (query, list) => {
    const searchTerms = query.toLowerCase().split(' ');
    const filtered = list?.filter((item) => {
      return searchTerms.every((term) => item.toLowerCase().includes(term));
    });
    return filtered;
  };

  return search;
};

export default useSearch;
