let filter = (originalArray) => {
    let arrayToFilter = [...originalArray];
    // console.log(arrayToFilter);
    for (let i in arrayToFilter) {
      let linkString = arrayToFilter[i];
      // console.log(linkString)
      linkString = linkString.replace(/-/g, ' ')
      linkString = linkString.split('/')
      let changed = false;
      for (let j in linkString) {
        //console.log(linkString[j])
        if (linkString[j].includes(' ')) {
          //console.log(linkString[j])
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
    // console.log(arrayToFilter)
    return arrayToFilter;
  }

export default filter;