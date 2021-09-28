export function optionFormatter(options, property) {
  return () =>
    function(row) {
      const matchedOption = options.find(option => option.value === row[property])
      return (matchedOption && matchedOption.label) || '-'
    }
}
