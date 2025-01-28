let quotes = loadQuotes();

// Fetch quotes from localStorage or initialize with sample data
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  return savedQuotes ? JSON.parse(savedQuotes) : [
    { text: "The only way to do great work is to love what you do.", category: "Motivation", lastModified: Date.now() },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom", lastModified: Date.now() },
    { text: "Life is what happens when you're busy making other plans.", category: "Life", lastModified: Date.now() }
  ];
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Sync local quotes with the "server" (simulated using JSONPlaceholder)
async function syncWithServer() {
  try {
    // Simulate server fetching
    const serverQuotes = await fetchQuotesFromServer();
    
    // Resolve conflicts: Server data takes precedence
    serverQuotes.forEach(serverQuote => {
      const localQuoteIndex = quotes.findIndex(quote => quote.text === serverQuote.text);
      if (localQuoteIndex === -1 || serverQuote.lastModified > quotes[localQuoteIndex].lastModified) {
        // If the server version is newer, update local quote
        quotes = quotes.filter(quote => quote.text !== serverQuote.text);
        quotes.push(serverQuote);
      }
    });

    saveQuotes();
    displayQuotes(quotes); // Update UI after syncing

  } catch (error) {
    console.error("Error syncing with server:", error);
  }
}

// Fetch quotes from the simulated server (using JSONPlaceholder)
async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  // Simulate returning an array of quotes
  return data.slice(0, 5).map(item => ({
    text: item.title,
    category: "General",
    lastModified: Date.now() // Adding a lastModified timestamp for simplicity
  }));
}

// Function to POST a new quote to the server (using JSONPlaceholder)
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Ensure the content type is JSON
      },
      body: JSON.stringify(newQuote), // Convert the new quote to a JSON string
    });

    if (!response.ok) {
      throw new Error('Failed to post quote to server');
    }

    const postedQuote = await response.json();
    console.log('Posted new quote to server:', postedQuote);
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}

// Periodically check for updates from the server every 10 seconds
setInterval(syncWithServer, 10000); // 10 seconds interval

// Populate categories dynamically (same as before)
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
  
  displayQuotes(filteredQuotes);
}

// Display quotes on the UI
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('div');
    quoteElement.innerHTML = `<p><strong>Category:</strong> ${quote.category}</p><p>"${quote.text}"</p>`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Add a new quote and sync it with the "server"
async function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory,
      lastModified: Date.now()
    };

    // Add the new quote to the local storage
    quotes.push(newQuote);
    saveQuotes();

    // Post the new quote to the server
    await postQuoteToServer(newQuote);

    // Sync with the server and display the new quote immediately
    await syncWithServer();
    displayQuotes([newQuote]);

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please fill in both fields to add a new quote.");
  }
}

// Show conflict resolution notification
function showConflictMessage(message) {
  document.getElementById('conflictMessage').textContent = message;
}

// Handle errors or conflicts when syncing
async function handleServerConflict() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    // Display conflict message
    showConflictMessage("Conflict detected: Server data has been updated.");
    // Optionally, allow users to resolve conflicts manually here
  } catch (error) {
    console.error("Error handling conflict:", error);
  }
}

// Initialize app by populating categories and syncing with the server
populateCategories();
syncWithServer();
