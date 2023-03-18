class StringUtils {
  capitalizeFirstLetter(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

    return capitalized;
  }
}

const stringUtils = new StringUtils();

export default stringUtils;
