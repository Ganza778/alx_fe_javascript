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
  
  // Array to store quotes
  let quotes = loadQuotes();
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Category:</strong> ${quote.category}</p>
      <p>"${quote.text}"</p>
    `;
  }
  
  // Function to add a new quote dynamically
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (newQuoteText && newQuoteCategory) {
      // Add new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Save quotes to local storage
      saveQuotes();
  
      // Clear the input fields
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
  
      alert("New quote added successfully!");
    } else {
      alert("Please fill in both fields to add a new quote.");
    }
  }
  
  // Function to create the form for adding a new quote
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    // Create input fields and button
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';
    
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';
    
    const addQuoteButton = document.createElement('button');
    addQuoteButton.innerText = 'Add Quote';
    addQuoteButton.onclick = addQuote;
  
    // Append elements to form container
    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
    
    // Append form container to body (or any other desired container)
    document.body.appendChild(formContainer);
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
      quotes.push(...importedQuotes); // Add imported quotes to the array
      saveQuotes(); // Save updated quotes to local storage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for showing a new random quote
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Display an initial random quote when the page loads
  showRandomQuote();
  
  // Create the "Add Quote" form dynamically
  createAddQuoteForm();
  
  // Export and Import Buttons
  const exportButton = document.createElement('button');
  exportButton.innerText = 'Export Quotes to JSON';
  exportButton.onclick = exportToJson;
  document.body.appendChild(exportButton);
  
  const importFileInput = document.createElement('input');
  importFileInput.type = 'file';
  importFileInput.id = 'importFile';
  importFileInput.accept = '.json';
  importFileInput.onchange = importFromJsonFile;
  document.body.appendChild(importFileInput);
  