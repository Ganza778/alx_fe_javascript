// Array to store quotes
let quotes = loadQuotes();

// Function to load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  return savedQuotes ? JSON.parse(savedQuotes) : [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate the category dropdown with unique categories using map
function populateCategories() {
  // Use map to create an array of categories, then use Set to remove duplicates
  const categories = [...new Set(quotes.map(quote => quote.category))];
  
  // Get the category filter dropdown
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Clear the existing options in case categories change
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Add each unique category to the dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  // Save the selected category to localStorage for future sessions
  localStorage.setItem('lastSelectedCategory', selectedCategory);

  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// Function to display quotes
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('div');
    quoteElement.innerHTML = `
      <p><strong>Category:</strong> ${quote.category}</p>
      <p>"${quote.text}"</p>
    `;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to add a new quote dynamically
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    populateCategories();  // Update category dropdown after adding new quote
    filterQuotes(); // Update quotes display after adding new one

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added successfully!");
  } else {
    alert("Please fill in both fields to add a new quote.");
  }
}

// Function to export quotes to a JSON file
function exportToJson() {
  const jsonBlob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const jsonUrl = URL.createObjectURL(jsonBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = jsonUrl;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();  // Update categories after importing quotes
    filterQuotes(); // Update quotes display after importing
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for showing a new random quote
document.getElementById("newQuote").addEventListener("click", function() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  displayQuotes([quote]);
});

// Initialize categories and filter
populateCategories();

// Retrieve the last selected category from localStorage and apply it
const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
document.getElementById('categoryFilter').value = lastSelectedCategory;
filterQuotes();
