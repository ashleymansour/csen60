// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions
/** 
 * initializeSearch = initializes the search by taking any of the URL tags and adding them to the list of search tags. sets 'parentElement' to 'newParentElement'. if parent element for displaying search tags isnt present then it will log error
 * */
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/** 
 * hideArticles = function that shows or hides the articles based on the tags in searchTag. the articles w/ out the matching tags are hidden. if searchTag is empty, then all articles are shown. for each tag in 'searchTag' it finds matching articles using 'findArticlesWithTag' 
 */
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  /**
   * use querySelectorAll to select all articles
   * iterate over them in a for loop
   * check if articlesWithTags array does not include the current article being iterated over,
   * then add "hidden" to that article's classList
   * else, remove "hidden" from that article's classList
   */
  // write your code here
  for (const article of document.querySelectorAll("article")) {
    if (!articlesWithTags.includes(article)) {
      article.classList.add("hidden");
    } else {
      article.classList.remove("hidden");
    }
  }
}

/**
 * Creates a clickable tag button for a given search term (text). When clicked,
 * the button will remove the corresponding tag from both the DOM and the searchTags array.
 * This function also calls hideArticles to update the articles displayed after removal.
 */

/** createTag function= creates a tag button for a search term and adds it to 'searchTags'
 * when clicked, tag is removed from 'searchTag' and articles are updated
 */
function createTag(text) {
  const button = document.createElement("button");
  button.classList.add("tag");
  button.textContent = text;
  /**
   * create a new element called button
   * add the class "tag" to its classList
   * set the button's textContent property to text (the passed in argument)
   */
  // write your code here

  function remove() {
    button.remove();
    const index = searchTags.indexOf(text);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }

    hideArticles();
  }

  /**
   * add a click event listener to the button, and set the listener to the remove function.
   * return the button element 
   */
  // write your code here
  button.addEventListener("click", remove);
  return button;
}

/**
 * findArticlesWithTag function = finds articles containing a specific tag
 * takes 'phrase' parameter, which is the tag to search for
 * if article contains the specific tag, it adds the article to article array
 * returns array of articles containing specific tag
 */
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim();
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li"));
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement);
        break;
      }
    }
  }

  return articles;
}

/**
 * addSearchTerm function = adds a new search term to 'searchTags' and displays it as a tag
 * updates the article to display 
 */
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text));
  searchTags.push(text);
  hideArticles();
}

// Handlers

/**
 * onSearch function = handles search input when enter key is pressed
 * if enter key is pressed, then calls 'addSearchTerm' with the input value 
 * resents input field to empty value 
 */
function onSearch(event) {
  const input = event.currentTarget;
  /**
   * If event.key equals "Enter":
   * call addSearchTerm and pass the input element's value
   * set input value to an empty string
   */
  // write your code here
  if (event.key === "Enter" ) {
    addSearchTerm(input.value);
    input.value = "";
  }
}

// Main function
/**
 * main function =  initializes the application 
 * calls 'initializeSearch' with the  '#searched-tags' container as the parent 
 * executes when script is first loaded
 */

function main() {
  initializeSearch(document.querySelector("#searched-tags"));

  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
 * Order of execution for each event: 
 * Pressing Enter: onSearch -> addSearchTerm -> createTag -> hideArticles
 * Clicking to Remove a Tag: createTag(remove function) -> hideArticles
 * Loading the Page: main -> initializeSearch ->addSearchTerm -> createTag ->hideArticles
 */