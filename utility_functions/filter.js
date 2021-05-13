let filter = (originalArray) => {
    let arrayToFilter = [...originalArray];
    for (let i in arrayToFilter) {
      let linkString = arrayToFilter[i];
      linkString = linkString.replace(/-/g, ' ')
      linkString = linkString.split('/')
      let changed = false;
      for (let j in linkString) {
        if (linkString[j].includes(' ')) {
          linkString[j] = linkString[j].split('?')
          linkString = linkString[j][0]
          changed = true;
          break;
        }
      }
      if (changed === false) {
        linkString = linkString[2].replace('www.', '').replace('.com', '');
        linkString += " project"
      }
      arrayToFilter[i] = { "link": arrayToFilter[i], "extractedTitle": decodeURIComponent(linkString) }
    }
    return arrayToFilter;
  }

export default filter;